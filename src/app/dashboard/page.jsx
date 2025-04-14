"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session) {
      router.push("/auth/login"); // Redirect if no session
      return;
    }

    // Use session image if available, otherwise set plain color
    if (session.user?.image) {
      setImages([{ src: session.user.image, alt: "User Image" }]);
    } else {
      setImages([{ src: "/placeholder-color.jpg", alt: "Default Color" }]);
    }
  }, [session, status]); // Only depend on session and status, remove router

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(45deg, #f4c542, #f9d849, #f4c542, #f9d849)",
        animation: "gradientAnimation 5s ease infinite",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-beige-100/80 to-beige-200/80" />
      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-orange-600">Welcome to Your Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
          {images.length > 0 && (
            <div className="absolute top-4 right-4">
              <div className="relative">
                <img
                  src={images[0].src}
                  alt={images[0].alt}
                  className="w-16 h-16 object-cover rounded-full shadow-md transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/placeholder-color.jpg"; // Fallback if image fails
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">
                  ⚙️
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "/placeholder-color.jpg"; // Fallback if image fails
                  }}
                />
                <div className="absolute -top-6 -left-6 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">
                  △
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}