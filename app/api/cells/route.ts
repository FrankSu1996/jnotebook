import { Cell } from "@/app/Redux/Slices/cellSlice";
import { POSTCellsRequestBody } from "@/types/api";
import { Database, Insert } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const { cells, fileName, userEmail } = await request.json();

  // const noteToSave: Insert<"Note"> = {
  //   cells,
  //   name: fileName,
  //   user_email: userEmail,
  // };

  //const { data, error } = await supabase.from("Notebook").insert([noteToSave]).select();

  return Response.json({ testing: 123 });
}
