import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function NavbarMenu() {
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4 ml-10">
      <MenubarMenu>
        <MenubarTrigger className="relative text-base">File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
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
