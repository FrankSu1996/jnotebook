import { Cell } from "@/app/Redux/Slices/cellSlice";
import { POSTCellsRequestBody } from "@/types/api";
import { Database, Insert } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const { cells, fileId } = await request.json();
  return Response.json(await supabase.from("Notes").update({ cells }).eq("id", fileId).select());
}

export async function GET(request: NextRequest) {
  const cookieStore = cookies();

  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const searchParams = request.nextUrl.searchParams;
  const noteId = searchParams.get("id")!;
  return Response.json(await supabase.from("Notes").select("*").eq("id", noteId));
}
