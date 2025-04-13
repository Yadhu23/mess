import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  // Log session to check if it's being correctly fetched
  console.log("Session:", session);

  if (!session || !session.user || !session.user.name) {
    console.error("No session or user ID found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("Session ID:", session.user.name); // Log the user ID to check if it's valid

    const userImage = session.user.image;

    if (!userImage) {
      return NextResponse.json({ error: "No image found" }, { status: 404 });
    }

    return NextResponse.json({ image: userImage });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Error fetching images" }, { status: 500 });
  }
}
