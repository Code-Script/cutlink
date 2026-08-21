import clientPromise from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("cutlink")
    const collection = db.collection("url")
    const user = await getCurrentUser()

    // check if short url exists

    const doc = await collection.findOne({shorturl: body.shorturl})
    if(doc){
        return NextResponse.json({ success:false, error: true, message: 'URL already exists!' })
    }

    const result = await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl,
        ...(user && { userId: user._id }),
    })
    

  return NextResponse.json({ success:true, error: false, message: 'URL generated successfully' })
}
