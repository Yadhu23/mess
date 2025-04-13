"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");  // Add error message state
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!res.error) {
      router.push("/dashboard");
    } else {
      setErrorMessage("Login failed: " + res.error);  // Set error message if login fails
    }
  };

  return (
    <><div
          className="relative min-h-screen bg-cover bg-center bg-no-repeat"
          style={{
              backgroundImage: "linear-gradient(45deg, #f4c542, #f9d849, #f4c542, #f9d849)",
              animation: "gradientAnimation 5s ease infinite"
          }}
      >
          {/* Gradient Overlay for Subtle Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-beige-100/80 to-beige-200/80" />

          {/* Main Content */}
          <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
              <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-12">
                  {/* Left Section - Imagery */}
                  <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative">
                          <img
                              src="/food1.jpg"
                              alt="Delicious Dish"
                              className="w-48 h-48 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300" />
                          <div className="absolute -top-6 -left-6 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">
                              △
                          </div>
                      </div>
                      <div className="flex flex-col gap-6">
                          <img
                              src="/food2.jpg"
                              alt="Appetizer"
                              className="w-40 h-40 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300" />
                          <img
                              src="/food3.jpg"
                              alt="Dessert"
                              className="w-40 h-40 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300" />
                      </div>
                  </div>

                  {/* Right Section - Login Form */}
                  <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">
                      <h2 className="text-4xl font-bold text-orange-600 mb-4 text-center">
                          Craving Something?
                      </h2>
                      <p className="text-sm text-gray-700 mb-6 text-center">
                          Let’s get you started! Log in to explore.
                      </p>

                      {/* Error Message */}
                      {errorMessage && (
                          <div className="text-red-500 text-sm mb-4">
                              {errorMessage}
                          </div>
                      )}

                      {/* Login Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
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
                                  placeholder="Your Email"
                                  value={form.email}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                                  required />
                          </div>
                          <div>
                              <label
                                  htmlFor="password"
                                  className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                  Password
                              </label>
                              <input
                                  type="password"
                                  id="password"
                                  name="password"
                                  placeholder="Password"
                                  value={form.password}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                                  required />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                              <label className="flex items-center text-gray-700">
                                  <input type="checkbox" className="mr-2 accent-orange-500" /> Remember Me
                              </label>
                              <a href="#" className="text-orange-500 hover:text-orange-400">
                                  Forgot Password?
                              </a>
                          </div>
                          <button
                              type="submit"
                              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 transition font-semibold"
                          >
                              Sign In
                          </button>
                      </form>

                      {/* GitHub Login */}
                      <div className="mt-4">
                          <button
                              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                              className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 flex items-center justify-center gap-2 transition"
                          >
                              <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                              >
                                  <path
                                      fillRule="evenodd"
                                      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.906-.62 .069-.608.069-.608 1.002.07 1.53 1.029 1.53 1.029.89 1.524 2.34 1.084 2.91.829.09-.647.35-1.084.637-1.334-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.985 1.029-2.683-.103-.253-.446-1.27.098-2.645 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.375.202 2.392.099 2.645.64.698 1.028 1.592 1.028 2.683 0 3.841-2.338 4.687-4.564 4.936.36.309.678.92.678 1.852 0 1.335-.012 2.415-.012 2.743 0 .268.18.577.688.48A10.002 10.002 0 0022 12c0-5.523-4.478-10-10-10z"
                                      clipRule="evenodd" />
                              </svg>
                              Sign in with GitHub
                          </button>
                      </div>

                      {/* Register Link */}
                      <p className="text-center mt-4 text-gray-700">
                          Don’t have an account?{" "}
                          <button
                              onClick={() => router.push("/auth/register")}
                              className="text-blue-500 hover:text-blue-400"
                          >
                              Register Now
                          </button>
                      </p>

                      {/* Terms and Privacy */}
                      <p className="text-xs text-gray-600 text-center mt-2">
                          By signing in, you agree to our{" "}
                          <a href="#" className="text-orange-500 hover:text-orange-400">
                              Terms of Service
                          </a>{" "}
                          &{" "}
                          <a href="#" className="text-orange-500 hover:text-orange-400">
                              Privacy Policy
                          </a>
                      </p>
                  </div>
              </div>
          </div>
      </div><style jsx>{`
      @keyframes gradientAnimation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `}</style></>
  );
}
