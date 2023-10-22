import clientPromise from "@/lib/mongodb/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    const db = (await clientPromise).db();
    console.log(db);
    return new Response("hi");
  } catch (e) {
    console.error(e);
    return new Response("hi");
  }
}
