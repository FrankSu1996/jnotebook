import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileTree } from "@/components/ui/Layout/file-tree";
import { Terminal } from "lucide-react";
import { getServerSession } from "next-auth";
import { createNotebook } from "@/lib/server actions/createNotebook";
import { fetchSavedNotebooks } from "@/lib/api";
import { Input } from "../input";
import { CreateNotebookTooltip } from "./create-notebook-tooltip";

export async function Sidebar() {
  const session = await getServerSession();
  const results = await fetchSavedNotebooks();

  return (
    <form action={createNotebook}>
      <Card className="mr-[5%] hidden lg:block h-full">
        <CardHeader>
          <CardTitle>Saved Notes</CardTitle>
          <CardDescription>Double click on a note or use the context menu to open</CardDescription>
        </CardHeader>
        <CardContent className="h-[75%]">
          <div className="flex mb-3 mt-4 justify-between">
            <CreateNotebookTooltip />
            <div className="ml-3">
              <Input name="notebookName" type="text" defaultValue={"notebook Name"} />
            </div>
          </div>
          {!session && (
            <Alert className="w-full">
              <Terminal className="h-4 w-4" />
              <AlertDescription>You need to be logged in to see your notes.</AlertDescription>
            </Alert>
          )}
          {session && <FileTree />}
          {/* {results?.map((row) => <div key={row.name}>{row.name}</div>)} */}
        </CardContent>
      </Card>
    </form>
  );
}
