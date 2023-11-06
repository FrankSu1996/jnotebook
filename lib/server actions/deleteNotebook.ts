"use server";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

export const deleteNotebookServerAction = async (notebookName: string) => {
  const session = await getServerSession();
  if (session) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
    if (notebookName) {
      await supabase.from("Notebooks").delete().eq("name", notebookName).select("*");
      revalidatePath("/");
    }
  }
};
