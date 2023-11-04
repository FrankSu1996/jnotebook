"use client";
import { createNotebookServerAction } from "@/lib/server actions/createNotebook";
import { Input } from "../input";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../button";
import { AlertCircle, Plus, Terminal } from "lucide-react";
import { DialogContent, DialogDescription, DialogTitle, Dialog, DialogHeader } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { selectDialog, setDialog, setIsDialogOpen } from "@/app/Redux/Slices/uiSlice";
import { Alert, AlertDescription, AlertTitle } from "../alert";

export const CreateNotebookDialog = () => {
  const dialog = useSelector(selectDialog);
  const dispatch = useDispatch();
  const ref = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Dialog
      onOpenChange={(open) => {
        dispatch(setIsDialogOpen(open));
        dispatch(setDialog({ open: false, dialogType: "create-notebook" }));
      }}
      open={dialog.open && dialog.dialogType === "create-notebook"}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Notebook</DialogTitle>
          <DialogDescription>Choose a name for your new notebook</DialogDescription>
        </DialogHeader>
        <form
          ref={ref}
          action={async (formData: FormData) => {
            const notebookName = formData.get("notebookName");
            if (notebookName === "") {
              setShowAlert(true);
              return;
            }
            setShowAlert(false);
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
              return;
            }
            dispatch(setDialog({ open: false, dialogType: "create-notebook" }));
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input type="text" name="notebookName" />
          <Button variant={"outline"} size={"default"} className="w-[4rem]" type="submit">
            <Plus />
          </Button>
        </form>
        {showAlert && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Notebook name cannot be empty.</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};
