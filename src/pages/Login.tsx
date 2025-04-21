
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", formData.email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Login error:", error.message);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.session) {
        console.log("Login successful, redirecting...");
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/");
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <div className="max-w-md mx-auto pt-10 pb-20">
        <h1 className="text-3xl font-serif font-medium text-mixology-purple mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 mb-8 text-center dark:text-gray-300">
          Log in to access your virtual bar and favorites
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mixology-burgundy/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mixology-burgundy/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-mixology-burgundy hover:underline dark:text-mixology-burgundy"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-mixology-burgundy text-white py-3 rounded-lg font-medium hover:bg-mixology-burgundy/90 transition-colors focus:ring-2 focus:ring-mixology-burgundy/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-mixology-burgundy font-medium hover:underline dark:text-mixology-burgundy"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
