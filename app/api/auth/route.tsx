import dbConnect from "@/lib/mongodb/dbConnect";
import clientPromise from "@/lib/mongodb/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await dbConnect();
    return new Response("hi");
  } catch (e) {
    console.error(e);
    return new Response("hi");
  }
}
