import clientPromise from "@/lib/mongodb";
import { createSession, hashPassword, publicUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  let email = "";
  let password = "";
  try {
    ({ email = "", password = "" } = await request.json());
  } catch {
    return NextResponse.json({ message: "Request body must be valid JSON." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail) || password.length < 8) {
    return NextResponse.json({ message: "Use a valid email and a password of at least 8 characters." }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const users = client.db("cutlink").collection("users");
    if (await users.findOne({ email: normalizedEmail })) {
      return NextResponse.json({ message: "An account already exists for this email." }, { status: 409 });
    }

    const result = await users.insertOne({ email: normalizedEmail, passwordHash: await hashPassword(password), createdAt: new Date() });
    const user = { _id: result.insertedId, email: normalizedEmail };
    await createSession(user._id);
    return NextResponse.json({ user: publicUser(user) }, { status: 201 });
  } catch (error) {
    console.error("Signup database request failed:", error);
    return NextResponse.json({ message: "Sign up is temporarily unavailable. Check the MongoDB connection and try again." }, { status: 503 });
  }
}
