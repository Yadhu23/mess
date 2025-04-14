import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Basic validation
    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }
    if (password.length < 6) {
      return new Response(JSON.stringify({ error: "Password must be at least 6 characters" }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 9);
    const newUser = await prisma.user.create({
      data: { name: username, email, password: hashedPassword },
    });

    return new Response(JSON.stringify({ message: "User created", user: { id: newUser.id, name: newUser.name, email: newUser.email } }), { status: 201 });
  } catch (error) {
    console.error("Registration error:", error.message);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}