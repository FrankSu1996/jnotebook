import { CellList } from "@/components/ui/Editor/cell-list";

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
    <div className="flex h-[90vh]">
      <div className="flex-1">
        <CellList />
      </div>
    </div>
  );
}
