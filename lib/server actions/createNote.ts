"use server";
import { Database, Insert, Json } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

export const createNoteServerAction = async (formData: FormData, notebookId: string) => {
  const session = await getServerSession();
  if (session) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
    const noteName = formData.get("noteName");
    if (noteName) {
      const { data: notebook, error } = await supabase.from("Notebooks").select("*").eq("id", notebookId);
      const cellsArray: Json[] = [];

      if (notebook) {
        const { data, error } = await supabase
          .from("Notes")
          .insert([{ cells: cellsArray, name: noteName.toString(), notebook_id: parseInt(notebookId), user_email: session.user?.email! }])
          .select("*");
        revalidatePath("/");
        return { data, error };
      }
    }
    revalidatePath("/");
  }
  return {
    data: null,
    error: null,
  };
};
