import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileTree } from "@/components/ui/Layout/file-tree";
import { Terminal } from "lucide-react";
import { getServerSession } from "next-auth";
import { createNotebook } from "@/lib/server actions/createNotebook";
import { Input } from "../input";
import { CreateNotebookButton } from "./create-notebook-tooltip";
import { Suspense } from "react";
import { Spinner } from "./spinner";

export async function Sidebar() {
  const session = await getServerSession();

  return (
    <form action={createNotebook}>
      <Card className="mr-[5%] hidden lg:block h-full">
        <CardHeader>
          <CardTitle>Saved Notes</CardTitle>
          <CardDescription>Double click on a note or use the context menu to open</CardDescription>
        </CardHeader>
        <CardContent className="h-[75%]">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <CreateNotebookButton />
          </div>
          {!session && (
            <Alert className="w-full">
              <Terminal className="h-4 w-4" />
              <AlertDescription>You need to be logged in to see your notes.</AlertDescription>
            </Alert>
          )}
          {session && (
            <Suspense fallback={<Spinner />}>
              <FileTree />
            </Suspense>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
