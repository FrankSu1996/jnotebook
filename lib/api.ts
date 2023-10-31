"use server";

import { Database, Insert } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

export const getSavedNotes = async (email: string) => {
  noStore();
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  return await supabase.from("Note").select("*").eq("user_email", email);
};

export const fetchSavedNotebooks = async (email) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const { data, error } = await supabase.from("Notebooks").select("*").eq("user_email", email);
  revalidatePath("/");
  return { data, error };
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
