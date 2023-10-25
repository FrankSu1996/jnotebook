"use client";
import { useState } from "react";
import { Button } from "../button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { selectShowLoginDialog, setShowLoginDialog } from "@/app/Redux/Slices/uiSlice";

export const LoginDialog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showDialog = useSelector(selectShowLoginDialog);
  const dispatch = useDispatch();
  return (
    <Dialog open={showDialog}>
      <DialogClose
        onClick={() => {
          dispatch(setShowLoginDialog(false));
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="pb-4">Create an Account</DialogTitle>
            <DialogDescription>Choose from one of the following authentication methods to get started.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("github")}>
              {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.gitHub className="mr-2 h-4 w-4" />} Github
            </Button>
            <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("google")}>
              {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.google className="mr-2 h-4 w-4" />} Google
            </Button>
          </div>
        </DialogContent>
      </DialogClose>
    </Dialog>
  );
};
