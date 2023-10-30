"use server";

import { Database, Insert } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

export const getSavedNotes = async (email: string) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  return await supabase.from("Note").select("*").eq("user_email", email);
};

export const getSavedNotebooks = async () => {
  const session = await getServerSession();
  if (session) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
    const { data, error } = await supabase
      .from("Notebooks")
      .select("*")
      .eq("user_email", session.user?.email!);
    if (data) return data;
  }
};
