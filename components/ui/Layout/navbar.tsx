import { MainNav } from "@/components/ui/Layout/main-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavbarMenu } from "./main-menu";
import { NavbarDropdown } from "./navbar-dropdown";

export const Navbar = () => {
  return (
    <div className="border-b px-3 w-full top-0 bg-background z-50">
      <div className="flex h-16 items-center px-4 w-full">
        {/* <TeamSwitcher /> */}
        <MainNav />
        <NavbarMenu />
        <div className="ml-auto flex items-center">
          <ThemeToggle />
          <NavbarDropdown />
        </div>
      </div>
    </div>
  );
};
