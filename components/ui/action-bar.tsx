import { useDispatch } from "react-redux";
import { Button } from "./button";
import { deleteCell, moveCell } from "@/app/Redux/Slices/cellSlice";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";

interface ActionBarProps {
  id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative bottom-0 left-0 z-20 group">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => dispatch(moveCell({ id, direction: "up" }))}
              className="rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="center">
            <p className="p-3 pl-10">Move Up (ctl+up)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => dispatch(moveCell({ id, direction: "down" }))}
              className="rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronDown />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="center">
            <p className="p-3">Move Down (ctl+down)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={() => dispatch(deleteCell(id))}
              className="rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="center">
            <p className="p-3">Delete cell</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
