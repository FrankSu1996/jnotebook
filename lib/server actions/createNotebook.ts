import { Database, Insert } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";

export const createNotebook = async (formData: FormData) => {
  "use server";
  const session = await getServerSession();
  if (session) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
    const notebookName = formData.get("notebookName");
    if (notebookName) {
      const { data, error } = await supabase
        .from("Notebooks")
        .insert([{ name: notebookName.toString(), user_email: session.user?.email! }])
        .select("*");
      console.log(data);
      console.log(error);
    }
    revalidatePath("/");
  }
};
