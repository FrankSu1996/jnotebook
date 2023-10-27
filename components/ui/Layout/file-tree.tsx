"use client";
import { useState } from "react";
import { Workflow, Folder, Layout } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tree } from "@/components/ui/tree-view";

const data = [
  { id: "1", name: "Unread" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      {
        id: "d1",
        name: "Alice",
        children: [
          {
            id: "d1",
            name: "Alice2",
            children: [
              {
                id: "d1",
                name: "Alice",
                children: [
                  { id: "d1", name: "Alice2" },
                  { id: "d2", name: "Bob2" },
                  { id: "d3", name: "Charlie2" },
                ],
              },
              { id: "d2", name: "Bob" },
              { id: "d3", name: "Charlie" },
            ],
          },
          { id: "d2", name: "Bob2" },
          { id: "d3", name: "Charlie2" },
        ],
      },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];

export const FileTree = () => {
  const [content, setContent] = useState("Admin Page");

  return (
    <div className="mt-24 ml-3 mr-[5%]">
      <Tree
        data={data}
        className="w-full h-full"
        initialSlelectedItemId="f12"
        onSelectChange={(item) => setContent(item?.name ?? "")}
        folderIcon={Folder}
        itemIcon={Workflow}
      />
    </div>
  );
};
