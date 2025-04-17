
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be connected to authentication in a real app
    console.log("Login attempt:", formData);
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
            className="w-full bg-mixology-burgundy text-white py-3 rounded-lg font-medium hover:bg-mixology-burgundy/90 transition-colors focus:ring-2 focus:ring-mixology-burgundy/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Log In
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
