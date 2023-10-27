"use client";

import * as React from "react";
// import { Tree } from "@acme/components/ui/tree";
import { Workflow, Folder, Layout } from "lucide-react";
import { Tree } from "@/components/ui/tree-view";

const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects Open Source Projects" },
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
          { id: "d11", name: "Alice2", icon: Layout },
          { id: "d12", name: "Bob2" },
          { id: "d13", name: "Charlie2" },
        ],
      },
      { id: "d2", name: "Bob", icon: Layout },
      { id: "d3", name: "Charlie" },
    ],
  },
  {
    id: "5",
    name: "Direct Messages",
    children: [
      {
        id: "e1",
        name: "Alice",
        children: [
          { id: "e11", name: "Alice2" },
          { id: "e12", name: "Bob2" },
          { id: "e13", name: "Charlie2" },
        ],
      },
      { id: "e2", name: "Bob" },
      { id: "e3", name: "Charlie" },
    ],
  },
  {
    id: "6",
    name: "Direct Messages",
    children: [
      {
        id: "f1",
        name: "Alice",
        children: [
          { id: "f11", name: "Alice2" },
          { id: "f12", name: "Bob2" },
          { id: "f13", name: "Charlie2" },
        ],
      },
      { id: "f2", name: "Bob" },
      { id: "f3", name: "Charlie" },
    ],
  },
];

function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      {/* Mobile view: Hamburger menu */}
      <button className="md:hidden p-4 focus:outline-none focus:ring" onClick={() => setIsOpen(!isOpen)}>
        &#9776; {/* Simple hamburger icon. Replace with SVG for a more stylish look. */}
      </button>

      {/* Sidebar: Shown by default on desktop and toggled on mobile */}
      <div
        className={`transform top-0 left-0 w-64 bg-blue-700 h-full fixed shadow-lg 
                      ${isOpen ? "translate-x-0" : "-translate-x-full"}
                      md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <button className="p-4 focus:outline-none focus:ring md:hidden" onClick={() => setIsOpen(false)}>
          &#10005; {/* Close button for mobile. */}
        </button>

        <ul>
          {/* Sample navigation items */}
          <li className="text-white p-4">Item 1</li>
          <li className="text-white p-4">Item 2</li>
          <li className="text-white p-4">Item 3</li>
          {/* Add more items as needed */}
        </ul>
      </div>
    </div>
  );
}

export default function Page() {
  const [content, setContent] = React.useState("Admin Page");

  return (
    <div className="gap-12 min-h-screen">
      <div className="flex min-h-full space-x-2">
        <Tree
          data={data}
          className="flex-shrink-0 w-[200px] h-[460px] border-[1px]"
          initialSlelectedItemId="f12"
          onSelectChange={(item) => setContent(item?.name ?? "")}
          folderIcon={Folder}
          itemIcon={Workflow}
        />
      </div>
    </div>
  );
}
