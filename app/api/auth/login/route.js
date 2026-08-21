import clientPromise from "@/lib/mongodb";
import { createSession, publicUser, verifyPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email = "", password = "" } = await request.json();
  const user = await (await clientPromise).db("cutlink").collection("users").findOne({ email: email.trim().toLowerCase() });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }
  await createSession(user._id);
  return NextResponse.json({ user: publicUser(user) });
}
