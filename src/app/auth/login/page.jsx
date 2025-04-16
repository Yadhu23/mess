"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-purple-600 to-purple-500 animate-[gradientAnimation_10s_infinite]">
      <Card className="w-full max-w-md p-6 backdrop-blur-md bg-white/60 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-purple-600 text-center">
            Craving Something?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4 text-center">
            Let’s get you started! Log in to explore.
          </p>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-sm">
                <Checkbox /> Remember Me
              </Label>
              <a href="#" className="text-sm text-purple-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Sign In
            </Button>
          </form>

          <div className="mt-4">
            <Button
              variant="secondary"
              className="w-full bg-purple-800 text-white hover:bg-purple-900"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              Sign in with GitHub
            </Button>
          </div>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <button
              onClick={() => router.push("/auth/register")}
              className="text-blue-500 hover:underline"
            >
              Register Now
            </button>
          </p>

          <p className="text-xs text-center text-gray-600 mt-2">
            By signing in, you agree to our{" "}
            <a href="#" className="text-purple-500 hover:underline">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="text-purple-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Gradient animation styles */}
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
