import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const links = await client
    .db("cutlink")
    .collection("url")
    .find({}, { projection: { _id: 0, url: 1, shorturl: 1 } })
    .sort({ _id: -1 })
    .toArray();

  return NextResponse.json(links);
}
