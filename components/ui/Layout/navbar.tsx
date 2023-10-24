"use client";

import { MainNav } from "@/components/ui/Layout/main-nav";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setShowLoginDialog } from "@/app/Redux/Slices/uiSlice";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const dropDownLabel = session ? "Welcome, " + session.user?.name : "Not logged in.";

  const loginDropdownMenuItem = (
    <DropdownMenuItem onClick={() => dispatch(setShowLoginDialog(true))}>
      <LogIn className="mr-2" />
      <div>Login</div>
    </DropdownMenuItem>
  );

  const logoutDropdownMenuItem = (
    <DropdownMenuItem onClick={() => signOut()}>
      <LogOut className="mr-2" />
      <div>Logout</div>
    </DropdownMenuItem>
  );

  return (
    <div className="border-b mb-10 px-3">
      <div className="flex h-16 items-center px-4 w-full">
        {/* <TeamSwitcher /> */}
        <MainNav />
        <div className="ml-auto flex items-center">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-none ml-3">
                <UserCircle2 size={35} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{dropDownLabel}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {session ? logoutDropdownMenuItem : loginDropdownMenuItem}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
