import { Cell } from "@/app/Redux/Slices/cellSlice";
import { CodeCell } from "./code-cell";
import { TextEditor } from "./text-editor";

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child;
  if (cell.type === "code") child = <CodeCell cell={cell} />;
  else child = <TextEditor cell={cell} />;

  return <div>{child}</div>;
};
