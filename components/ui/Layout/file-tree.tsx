import { Tree } from "@/components/ui/tree-view";
import { fetchSavedNotebooks, fetchSavedNotes } from "@/lib/api";
import { getServerSession } from "next-auth";
import { Database, TableRow } from "@/types/supabase";

export const NotebookTree = async () => {
  const session = await getServerSession();
  const results = await Promise.allSettled([fetchSavedNotebooks(session?.user?.email), fetchSavedNotes(session?.user?.email)]);
  const [fetchNotebooksResult, fetchNotesResult] = results;
  let notebooks, notes;
  if (fetchNotebooksResult.status === "fulfilled") {
    notebooks = fetchNotebooksResult.value;
  }
  if (fetchNotesResult.status === "fulfilled") {
    notes = fetchNotesResult.value;
  }

  const treeData = notebooks?.map((notebook) => {
    const notebookId = notebook.id.toString();

    return {
      id: notebookId,
      name: notebook.name,
      children: notes
        ?.filter((note) => {
          return note.notebook_id.toString() === notebookId;
        })
        .map((note) => {
          return {
            id: note.id.toString(),
            name: note.name,
            children: null,
          };
        }),
    };
  });
  return <Tree data={treeData} className="w-full h-full relative z-50" />;
};
