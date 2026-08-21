import { getCurrentUser, publicUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ user: publicUser(await getCurrentUser()) });
}
