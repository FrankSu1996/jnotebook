"use client";

import { CellList } from "@/components/ui/Editor/cell-list";
import { LoginDialog } from "@/components/ui/Authentication/login-dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { saveCellsToFileAction } from "./Redux/Slices/cellSlice";
import { AppDispatch } from "./Redux/store";

export default function Page() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(saveCellsToFileAction({ userEmail: "franksu49@gmail.com", fileName: "testFileName" }))}>Save Cell</Button>
      <LoginDialog />
      <CellList />
    </div>
  );
}
