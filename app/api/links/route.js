import clientPromise from "@/lib/mongodb";
import { getCurrentUser, publicUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ user: null, links: [] });
  const client = await clientPromise;
  const links = await client
    .db("cutlink")
    .collection("url")
    .find({ userId: user._id }, { projection: { _id: 0, url: 1, shorturl: 1 } })
    .sort({ _id: -1 })
    .toArray();

  return NextResponse.json({ user: publicUser(user), links });
}
