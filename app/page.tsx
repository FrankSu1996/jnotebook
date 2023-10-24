import { CellList } from "@/components/ui/Editor/cell-list";
import { LoginDialog } from "@/components/ui/Authentication/login-dialog";

export default function Page() {
  return (
    <div>
      <LoginDialog />
      <CellList />
    </div>
  );
}
