import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { getServerSession } from "next-auth";

export async function NavbarMenu() {
  const session = await getServerSession();

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4 ml-10 bg-nav">
      <MenubarMenu>
        <MenubarTrigger className="relative text-base w-full">File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled={!session}>
            Save <MenubarShortcut>Ctrl + S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Import</MenubarItem>
          <MenubarItem>Export</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
