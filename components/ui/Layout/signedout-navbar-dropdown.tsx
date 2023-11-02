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
import { LogOut, Settings, UserCircle2 } from "lucide-react";
import { Dialog, DialogHeader } from "../dialog";
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../button";
import { Icons } from "../icons";
import { useState } from "react";

export const SignedOutNavbarDropdown = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignIn = async (provider) => {
    setIsLoading(true);
    await signIn(provider);
    setIsLoading(false);
  };

  return (
    <Dialog>
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
              <LogOut className="mr-2" />
              <div>Logout</div>
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
          <Button variant="outline" type="button" disabled={isLoading} onClick={() => handleSignIn("github")}>
            {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.gitHub className="mr-2 h-4 w-4" />} Github
          </Button>
          <Button variant="outline" type="button" disabled={isLoading} onClick={() => handleSignIn("google")}>
            {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.google className="mr-2 h-4 w-4" />} Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
