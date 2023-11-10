import { useDispatch } from "react-redux";
import { Button } from "./button";
import { deleteCell, moveCell } from "@/app/Redux/Slices/cellSlice";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { AppDispatch } from "@/app/Redux/store";
import { Tooltip } from "./tooltip";

interface ActionBarProps {
  id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex group bg-muted opacity-50 hover:opacity-75 transition-opacity duration-300 rounded justify-between">
      <div>
        <Button
          data-tooltip-id="move-cell-up-tooltip"
          variant={"outline"}
          size={"sm"}
          onClick={() => dispatch(moveCell({ id, direction: "up" }))}
          className="opacity-50 group-hover:opacity-100 transition-opacity duration-300  rounded"
        >
          <ChevronUp />
        </Button>
        <Button
          data-tooltip-id="move-cell-down-tooltip"
          variant={"outline"}
          size={"sm"}
          onClick={() => dispatch(moveCell({ id, direction: "down" }))}
          className="rounded opacity-50 group-hover:opacity-100 transition-opacity duration-300 "
        >
          <ChevronDown />
        </Button>
        <Button
          data-tooltip-id="delete-cell-tooltip"
          variant={"destructive"}
          size={"sm"}
          onClick={() => dispatch(deleteCell(id))}
          className="rounded opacity-50 group-hover:opacity-100 transition-opacity duration-300 "
        >
          <X />
        </Button>
        <Tooltip id="delete-cell-tooltip" place="top" content="Delete Cell" />
        <Tooltip id="move-cell-up-tooltip" place="top" content="Move Up (Ctl + Up)" />
        <Tooltip id="move-cell-down-tooltip" place="top" content="Move Down (Ctl + Down)" />
      </div>
      <div>
        <Button
          data-tooltip-id="move-cell-up-tooltip"
          variant={"outline"}
          size={"sm"}
          onClick={() => dispatch(moveCell({ id, direction: "up" }))}
          className="opacity-50 group-hover:opacity-100 transition-opacity duration-300  rounded"
        >
          <ChevronUp />
        </Button>
      </div>
    </div>
  );
};
