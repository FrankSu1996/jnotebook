import { Tree } from "@/components/ui/tree-view";
import { fetchSavedNotebooks } from "@/lib/api";
import { getServerSession } from "next-auth";

export const NotebookTree = async () => {
  const session = await getServerSession();
  const { data: notebooks, error } = await fetchSavedNotebooks(session?.user?.email);
  const treeData = notebooks?.map((notebook) => {
    return {
      id: notebook.name,
      name: notebook.name,
      children: [],
    };
  });
  return <Tree data={treeData} className="w-full h-full relative z-50" />;
};
