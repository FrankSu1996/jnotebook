import dbConnect from "@/lib/mongodb/dbConnect";

export async function GET(request: Request) {
  try {
    await dbConnect();
    return new Response("hi");
  } catch (e) {
    console.error(e);
    return new Response("hi");
  }
}
