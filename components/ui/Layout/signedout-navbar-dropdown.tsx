"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn } from "next-auth/react";
import { LogIn, LogOut, Settings, UserCircle2 } from "lucide-react";
import { Dialog, DialogHeader } from "../dialog";
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../button";
import { Icons } from "../icons";
import { useDispatch } from "react-redux";
import { setIsDialogOpen } from "@/app/Redux/Slices/uiSlice";

export const SignedOutNavbarDropdown = () => {
  const dispatch = useDispatch();

  return (
    <Dialog onOpenChange={(open) => dispatch(setIsDialogOpen(open))}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="ml-3 cursor-pointer">
            <AvatarImage />
            <AvatarFallback>
              <UserCircle2 size={40} />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>Not Logged in</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <LogIn className="mr-2" />
              <div>Login</div>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={true}>
            <Settings className="mr-2" />
            <div>Settings</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px] testing">
        <DialogHeader>
          <DialogTitle className="pb-4">Create an Account</DialogTitle>
          <DialogDescription>Choose from one of the following authentication methods to get started.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button variant="outline" type="button" onClick={() => signIn("github")}>
            <Icons.gitHub className="mr-2 h-4 w-4" /> Github
          </Button>
          <Button variant="outline" type="button" onClick={() => signIn("google")}>
            <Icons.google className="mr-2 h-4 w-4" /> Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
