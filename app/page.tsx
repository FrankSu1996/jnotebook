import { CellList } from "@/components/ui/Editor/cell-list";

export default function Page() {
  return (
    <div className="flex h-[90vh]">
      <div className="flex-1">
        <CellList />
      </div>
    </div>
  );
}
