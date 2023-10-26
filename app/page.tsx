import { CellList } from "@/components/ui/Editor/cell-list";
import { LoginDialog } from "@/components/ui/Authentication/login-dialog";
import Tree from "@/components/ui/Layout/tree-view";

const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
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

export default function Page() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 h-full">
        <CellList />
      </div>
    </div>
  );
}
