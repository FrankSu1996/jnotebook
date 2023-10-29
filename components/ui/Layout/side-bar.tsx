"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileTree } from "@/components/ui/Layout/file-tree";
import { Terminal } from "lucide-react";
import { useSession } from "next-auth/react";

export function Sidebar() {
  const { data: session } = useSession();

  return (
    <Card className="mr-[5%] z-0 hidden lg:block">
      <CardHeader>
        <CardTitle>Saved Notebooks</CardTitle>
        <CardDescription>Double click on a note or use the context menu to open</CardDescription>
      </CardHeader>
      <CardContent className="h-[75%]">
        {!session && (
          <Alert className="w-full">
            <Terminal className="h-4 w-4" />
            <AlertDescription>You need to be logged in to see your notes.</AlertDescription>
          </Alert>
        )}
        {session && <FileTree />}
      </CardContent>
    </Card>
  );
}
