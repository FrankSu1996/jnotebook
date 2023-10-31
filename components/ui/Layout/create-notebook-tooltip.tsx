"use client";
import { BookOpenText } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Button } from "../button";
import { useFormStatus } from "react-dom";

export const CreateNotebookButton = () => {
  const { pending } = useFormStatus();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="submit" variant={"outline"} size={"default"} className="w-[4rem]" disabled={pending}>
            <BookOpenText />
          </Button>
        </TooltipTrigger>
        <TooltipContent align="center">
          <p className="mr-6 pb-2 ">Create notebook</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
