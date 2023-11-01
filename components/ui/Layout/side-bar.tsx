import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NotebookTree } from "@/components/ui/Layout/file-tree";
import { Terminal } from "lucide-react";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { Spinner } from "./spinner";
import { CreateNotebookForm } from "./create-notebook-form";

export async function Sidebar() {
  const session = await getServerSession();

  return (
    <Card className="mr-[5%] hidden lg:block h-full w-[400px]">
      <CardHeader>
        <CardTitle>Saved Notes</CardTitle>
        <CardDescription>Double click on a note or use the context menu to open</CardDescription>
      </CardHeader>
      <CardContent className="h-[75%]">
        {!session && (
          <Alert className="w-full">
            <Terminal className="h-4 w-4" />
            <AlertDescription>You need to be logged in to see your notes.</AlertDescription>
          </Alert>
        )}
        {session && <CreateNotebookForm />}

        {session && (
          <Suspense fallback={<Spinner />}>
            <NotebookTree />
          </Suspense>
        )}
      </CardContent>
    </Card>
  );
}
