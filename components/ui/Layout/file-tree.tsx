"use client";
import { useState } from "react";
import { Workflow, Folder, Layout } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tree } from "@/components/ui/tree-view";

const data = [
  {
    id: "3",
    name: "use state notes",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "use effect notes",
    children: [
      {
        id: "3",
        name: "use state notes",
        children: [
          { id: "c1", name: "General" },
          { id: "c2", name: "Random" },
          { id: "c3", name: "Open Source Projects" },
        ],
      },
      {
        id: "4",
        name: "use effect notes",
        children: [
          { id: "c9", name: "General" },
          { id: "c7", name: "Random" },
          { id: "c4", name: "Open Source Projects" },
        ],
      },
      { id: "c4", name: "Open Source Projects" },
    ],
  },
];

export const FileTree = () => {
  const [content, setContent] = useState("Admin Page");

  return (
    <Tree
      data={data}
      className="w-full h-full relative z-50"
      onSelectChange={(item) => setContent(item?.name ?? "")}
      folderIcon={Folder}
      itemIcon={Workflow}
      initialSlelectedItemId="3"
    />
  );
};
