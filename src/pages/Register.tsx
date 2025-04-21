
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const MIN_PASSWORD_LEN = 8;
const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 8 chars, upper, lower, number

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      return "Please enter a valid email address.";
    }
    if (!passwordStrengthRegex.test(formData.password)) {
      return "Password requires at least 8 characters (one uppercase, one lowercase, one number).";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      toast({ title: "Registration Error", description: errorMsg, variant: "destructive" });
      return;
    }
    setLoading(true);

    const { email, password } = formData;
    // Register user with supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { email },
      },
    });

    setLoading(false);

    if (error) {
      toast({ title: "Registration Failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: "Registration Successful",
      description:
        "A confirmation email has been sent. Please check your inbox and verify your email before logging in.",
      variant: "default",
    });
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <div className="max-w-md mx-auto pt-10 pb-20">
        <h1 className="text-3xl font-serif font-medium text-mixology-purple mb-2 text-center">
          Create an Account
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Join MixologyMaster to save your favorite cocktails and build your virtual bar
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mixology-purple/50"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mixology-purple/50"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength={MIN_PASSWORD_LEN}
                disabled={loading}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters and contain uppercase, lowercase, and a number.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mixology-purple/50"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={MIN_PASSWORD_LEN}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-mixology-burgundy text-white py-3 rounded-lg font-medium hover:bg-mixology-burgundy/90 transition-colors"
            disabled={loading}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-mixology-burgundy font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
