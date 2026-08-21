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

export async function DELETE(request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

  const { shorturl } = await request.json();
  if (!shorturl) {
    return NextResponse.json({ message: "Short URL is required" }, { status: 400 });
  }

  const client = await clientPromise;
  const result = await client
    .db("cutlink")
    .collection("url")
    .deleteOne({ shorturl, userId: user._id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Short URL not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
