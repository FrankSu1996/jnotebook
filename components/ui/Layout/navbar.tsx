import { MainNav } from "@/components/ui/Layout/main-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavbarMenu } from "./main-menu";
import { SignedOutNavbarDropdown } from "./signedout-navbar-dropdown";
import { getServerSession } from "next-auth";
import { SignedInNavbarDropdown } from "./signedin-navbar-dropdown";

export const Navbar = async () => {
  const session = await getServerSession();
  const navbarDropdown = session ? <SignedInNavbarDropdown /> : <SignedOutNavbarDropdown />;

  return (
    <div className="border-b px-3 w-full top-0 bg-background z-50">
      <div className="flex h-16 items-center px-4 w-full">
        {/* <TeamSwitcher /> */}
        <MainNav />
        <NavbarMenu />
        <div className="ml-auto flex items-center">
          <ThemeToggle />
        </div>
        {navbarDropdown}
      </div>
    </div>
  );
};
