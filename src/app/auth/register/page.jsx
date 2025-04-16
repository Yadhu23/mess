"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/auth/login");
    } else {
      setErrorMessage(data.message || "Registration failed");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #8b5cf6, #a78bfa, #8b5cf6, #a78bfa)",
        animation: "gradientAnimation 5s ease infinite",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/80 to-purple-600/80" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img
                src="/food1.jpg"
                alt="Delicious Dish"
                className="w-48 h-48 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-6 -left-6 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">
                △
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <img
                src="/food2.jpg"
                alt="Appetizer"
                className="w-40 h-40 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
              <img
                src="/food3.jpg"
                alt="Dessert"
                className="w-40 h-40 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            {/* Change heading to black */}
            <h2 className="text-4xl font-bold text-black mb-4 text-center">
              Join the Feast!
            </h2>
            <p className="text-sm text-gray-700 mb-6 text-center">
              Create an account to start exploring.
            </p>

            {errorMessage && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your Username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  required
                />
              </div>

              {/* Email */}
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
                  className="w-full px-4 py-2 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  required
                />
              </div>

              {/* Password */}
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
                  className="w-full px-4 py-2 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  required
                />
              </div>

              {/* Confirm Password */}
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
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition font-semibold"
              >
                Register
              </button>
            </form>

            <p className="text-center mt-4 text-gray-700">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/auth/login")}
                className="text-blue-500 hover:text-blue-400"
              >
                Log In
              </button>
            </p>

            <p className="text-xs text-gray-600 text-center mt-2">
              By registering, you agree to our{" "}
              <a href="#" className="text-purple-500 hover:text-purple-400">
                Terms of Service
              </a>{" "}
              &{" "}
              <a href="#" className="text-purple-500 hover:text-purple-400">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
}
