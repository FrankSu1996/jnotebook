"use server";

import { Database, TableRow } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

export const fetchSavedNotes = async (email: string | null | undefined): Promise<TableRow<"Notes">[] | null> => {
  if (!email) return null;
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const { data, error } = await supabase.from("Notes").select("*").eq("user_email", email);
  if (!error) {
    return data;
  } else return null;
};

export const fetchSavedNotebooks = async (email: string | null | undefined): Promise<TableRow<"Notebooks">[] | null> => {
  if (!email) return null;
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const { data, error } = await supabase.from("Notebooks").select("*").eq("user_email", email);
  if (!error) return data;
  else return null;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
