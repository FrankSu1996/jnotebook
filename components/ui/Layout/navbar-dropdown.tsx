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
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, Settings, UserCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setShowLoginDialog } from "@/app/Redux/Slices/uiSlice";

export const NavbarDropdown = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const imageUrl = session?.user?.image;
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ml-3 cursor-pointer">
          <AvatarImage src={imageUrl ? imageUrl : undefined} />
          <AvatarFallback>
            <UserCircle2 size={40} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>{dropDownLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session ? logoutDropdownMenuItem : loginDropdownMenuItem}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={!session}>
          <Settings className="mr-2" />
          <div>Settings</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
