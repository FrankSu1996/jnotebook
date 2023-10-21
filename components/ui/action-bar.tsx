import { useDispatch } from "react-redux";
import { Button } from "./button";
import { deleteCell, moveCell } from "@/app/Redux/Slices/cellSlice";
import { ChevronUp, ChevronDown, X } from "lucide-react";

interface ActionBarProps {
  id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <div className="absolute bottom-0 left-0 z-20 group">
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => dispatch(moveCell({ id, direction: "up" }))}
        className="rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronUp />
      </Button>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => dispatch(moveCell({ id, direction: "down" }))}
        className="rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronDown />
      </Button>
      <Button
        variant={"destructive"}
        size={"sm"}
        onClick={() => dispatch(deleteCell(id))}
        className="rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <X />
      </Button>
    </div>
  );
};
