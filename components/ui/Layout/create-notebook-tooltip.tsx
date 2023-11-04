"use client";
import { BookOpenText } from "lucide-react";
import { Button } from "../button";
import { useDispatch } from "react-redux";
import { setDialog } from "@/app/Redux/Slices/uiSlice";
import { Tooltip } from "../tooltip";

export const CreateNotebookButton = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        data-tooltip-id="create-notebook-tooltip"
        variant={"outline"}
        size={"default"}
        className="w-[4rem]"
        onClick={() => dispatch(setDialog({ open: true, dialogType: "create-notebook" }))}
      >
        <BookOpenText />
      </Button>
      <Tooltip id="create-notebook-tooltip" place="top" content="Create Notebook" />
    </div>
  );
};
