"use client";
import { FolderPlus } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Button } from "../button";

export const CreateNotebookButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="submit" variant={"outline"} size={"default"} className="w-[4rem]">
            <FolderPlus />
          </Button>
        </TooltipTrigger>
        <TooltipContent align="center">
          <p className="mr-6 pb-2 ">Create notebook</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
