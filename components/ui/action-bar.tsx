import { useDispatch } from "react-redux";
import { Button } from "./button";
import { deleteCell, moveCell } from "@/app/Redux/Slices/cellSlice";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { AppDispatch } from "@/app/Redux/store";

interface ActionBarProps {
  id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex z-20 group bg-muted opacity-50 hover:opacity-75 transition-opacity duration-300 rounded">
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => dispatch(moveCell({ id, direction: "up" }))}
                className="opacity-50 group-hover:opacity-100 transition-opacity duration-300  rounded"
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
                className="rounded opacity-50 group-hover:opacity-100 transition-opacity duration-300 "
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
                className="rounded opacity-50 group-hover:opacity-100 transition-opacity duration-300 "
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
    </div>
  );
};
