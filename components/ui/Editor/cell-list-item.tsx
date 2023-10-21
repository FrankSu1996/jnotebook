import { Cell } from "@/app/Redux/Slices/cellSlice";
import { CodeCell } from "./code-cell";
import { TextEditor } from "./text-editor";
import { ActionBar } from "../action-bar";

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child;
  if (cell.type === "code") {
    child = (
      <>
        <div>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <div>
          <ActionBar id={cell.id} />
        </div>
        <TextEditor cell={cell} />
      </>
    );
  }

  return <div className="relative pb-5">{child}</div>;
};
