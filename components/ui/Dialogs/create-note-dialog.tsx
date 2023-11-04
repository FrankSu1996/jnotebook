"use client";
import { Input } from "../input";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../button";
import { AlertCircle, Plus, Terminal } from "lucide-react";
import { DialogContent, DialogDescription, DialogTitle, Dialog, DialogHeader } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { selectDialog, setDialog, setIsDialogOpen } from "@/app/Redux/Slices/uiSlice";
import { Alert, AlertDescription, AlertTitle } from "../alert";

export const CreateNoteDialog = () => {
  const dialog = useSelector(selectDialog);
  const dispatch = useDispatch();
  const ref = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Dialog
      onOpenChange={(open) => {
        dispatch(setIsDialogOpen(open));
        dispatch(setDialog({ open: false, dialogType: "create-note" }));
      }}
      open={dialog.open && dialog.dialogType === "create-note"}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
          <DialogDescription>Choose a name for your new Note</DialogDescription>
        </DialogHeader>
        <form
          ref={ref}
          action={async (formData: FormData) => {
            const noteName = formData.get("noteName");
            if (noteName === "") {
              setShowAlert(true);
              return;
            }
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input type="text" name="noteName" />
          <Button variant={"outline"} size={"default"} className="w-[4rem]" type="submit">
            <Plus />
          </Button>
        </form>
        {showAlert && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Note name cannot be empty.</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};
