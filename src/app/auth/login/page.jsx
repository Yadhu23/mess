"use client";

import { signIn } from "next-auth/react";
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

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
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

    if (!res?.error) {
      router.push("/dashboard");
    } else {
      setErrorMessage("Login failed: " + res.error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url('/watercolour-bg.jpg')`, // Restored full-page background
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

      {/* Login Card */}
      <Card
        className="w-full max-w-md p-6 shadow-xl rounded-2xl relative z-10"
        style={{
          backgroundImage: `url('/pexels-artempodrez-7233109.jpg')`, // Card background
          backgroundSize: 'cover', // Enlarged to fit the card
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-purple-800/40 rounded-2xl"></div> {/* Overlay for contrast */}

        <CardHeader className="relative z-10">
          <CardTitle className="text-3xl text-white text-center">
            Craving Something?
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <p className="text-sm mb-4 text-center text-white/90">
            Let’s get you started! Log in to explore.
          </p>

          {errorMessage && (
            <div className="text-red-300 text-sm mb-4">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-white/20 backdrop-blur-md text-white placeholder-white/80"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-white/20 backdrop-blur-md text-white placeholder-white/80"
              />
            </div>

            <div className="flex items-center justify-between text-white">
              <Label className="flex items-center gap-2 text-sm">
                <Checkbox className="bg-white" /> Remember Me
              </Label>
              <a href="#" className="text-sm text-white hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button type="submit" className="w-full bg-white text-purple-700 hover:bg-gray-100">
              Sign In
            </Button>
          </form>

          <div className="mt-4">
            <Button
              variant="secondary"
              className="w-full bg-white text-purple-800 hover:bg-gray-100"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              Sign in with GitHub
            </Button>
          </div>

          <p className="text-center mt-4 text-sm text-white/90">
            Don’t have an account?{" "}
            <button
              onClick={() => router.push("/auth/register")}
              className="text-blue-200 hover:underline"
            >
              Register Now
            </button>
          </p>

          <p className="text-xs text-center text-white/80 mt-2">
            By signing in, you agree to our{" "}
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