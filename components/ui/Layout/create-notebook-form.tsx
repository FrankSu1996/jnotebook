"use client";
import { createNotebookServerAction } from "@/lib/server actions/createNotebook";
import { Input } from "../input";
import { CreateNotebookButton } from "./create-notebook-tooltip";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

export const CreateNotebookForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  return (
    <form
      ref={ref}
      action={async (formData: FormData) => {
        const notebookName = formData.get("notebookName");
        ref.current?.reset();
        const { error } = await createNotebookServerAction(formData);
        if (error) {
          if (error?.code === "23505")
            toast({
              variant: "destructive",
              title: "Error creating notebook",
              description: "There is already a saved notebook named " + notebookName,
            });
          else {
            toast({
              variant: "destructive",
              title: "Error creating notebook",
              description: "Something went wrong...",
            });
          }
        }
      }}
      className="flex w-full items-center space-x-2"
    >
      <Input type="text" placeholder="enter Notebook name" name="notebookName" />
      <CreateNotebookButton />
    </form>
  );
};
