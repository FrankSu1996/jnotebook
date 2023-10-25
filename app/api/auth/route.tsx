import dbConnect from "@/lib/mongodb/dbConnect";
import { getToken } from "next-auth/jwt";

export async function GET(request: Request) {
  try {
    return new Response("hi");
  } catch (e) {
    console.error(e);
    return new Response("hi");
  }
}
