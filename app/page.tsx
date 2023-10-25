import { CellList } from "@/components/ui/Editor/cell-list";
import { LoginDialog } from "@/components/ui/Authentication/login-dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
  return (
    <div>
      <LoginDialog />
      <CellList />
    </div>
  );
}
