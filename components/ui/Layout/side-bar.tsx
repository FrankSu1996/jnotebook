import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NotebookTree } from "@/components/ui/Layout/file-tree";
import { Terminal } from "lucide-react";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { Spinner } from "./spinner";
import { Input } from "../input";
import { CreateNotebookButton } from "./create-notebook-tooltip";
import { CreateNotebookDialog } from "./create-notebook-dialog";

export async function Sidebar() {
  const session = await getServerSession();

  return (
    <Card className="mr-[5%] hidden lg:block h-full z-50">
      <CardHeader>
        <CardTitle>Saved Notes</CardTitle>
        <CardDescription>Double click on a note or use the context menu to open</CardDescription>
      </CardHeader>
      <CardContent className="h-[75%]">
        {!session && (
          <div>
            <Alert className="w-full">
              <Terminal className="h-4 w-4" />
              <AlertDescription>
                You need to be logged in to be able to save and view notes from your cloud storage. You can still import/export notes to your local
                machine.
              </AlertDescription>
            </Alert>
          </div>
        )}
        {session && (
          <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder="Search for a note" name="notebookName" />
            <CreateNotebookButton />
            <CreateNotebookDialog />
          </div>
        )}
        {session && (
          <Suspense fallback={<Spinner />}>
            <NotebookTree />
          </Suspense>
        )}
      </CardContent>
    </Card>
  );
}
