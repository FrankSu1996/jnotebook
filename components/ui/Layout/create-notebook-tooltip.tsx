"use client";
import { BookOpenText } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Button } from "../button";

export const CreateNotebookButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"outline"} size={"default"} className="w-[4rem]">
            <BookOpenText />
          </Button>
        </TooltipTrigger>
        <TooltipContent align="center">
          <p className="mr-14 pb-2 ">Create notebook</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
