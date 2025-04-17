"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url('/watercolour-bg.jpg')`, // Full-page watercolor background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* FoodShare top left */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
        <Heart className="h-6 w-6 text-purple-600" />
        <span className="text-xl font-bold text-purple-700">FoodShare</span>
      </div>

      {/* Register Card */}
      <Card
        className="w-full max-w-md p-6 shadow-xl rounded-2xl relative z-10"
        style={{
          backgroundImage: `url('/pexels-artempodrez-7233109.jpg')`, // Card background from LoginPage
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-purple-800/40 rounded-2xl"></div> {/* Overlay from LoginPage */}

        <CardHeader className="relative z-10">
          <CardTitle className="text-3xl text-white text-center">
            Join the Feast!
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <p className="text-sm text-white/90 mb-6 text-center">
            Create an account to start exploring.
          </p>

          {errorMessage && (
            <div className="text-red-300 text-sm mb-4 text-center">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Your Username"
                value={form.username}
                onChange={handleChange}
                className="bg-white/20 backdrop-blur-md text-white placeholder-white/80"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="bg-white/20 backdrop-blur-md text-white placeholder-white/80"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-white/20 backdrop-blur-md text-white placeholder-white/80"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="bg-white/20 backdrop-blur-md text-white placeholder-white/80"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-purple-700 hover:bg-gray-100"
            >
              Register
            </Button>
          </form>

          <p className="text-center mt-4 text-white/90">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="text-blue-200 hover:text-blue-100"
            >
              Log In
            </button>
          </p>

          <p className="text-xs text-white/80 text-center mt-2">
            By registering, you agree to our{" "}
            <a href="#" className="text-white hover:underline">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="text-white hover:underline">
              Privacy Policy
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}