"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Utensils, Users, ArrowRight, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">FoodShare</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
              How It Works
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Impact
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
              About Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => router.push("/auth/login")}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Log In
            </Button>
            <Button onClick={() => router.push("/auth/register")} className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>FoodShare</SheetTitle>
                <SheetDescription>Fighting hunger, reducing waste</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
                  Home
                </Link>
                <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
                  How It Works
                </Link>
                <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
                  Impact
                </Link>
                <Link href="#" className="text-sm font-medium hover:text-purple-600 transition-colors">
                  About Us
                </Link>
                <div className="flex flex-col gap-2 pt-4">
                  <Button
                    onClick={() => router.push("/auth/login")}
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 w-full"
                  >
                    Log In
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 w-full">Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        {/* Footer content */}
      </footer>
    </div>
  );
}
