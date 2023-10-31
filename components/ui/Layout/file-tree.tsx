import { Tree } from "@/components/ui/tree-view";
import { fetchSavedNotebooks } from "@/lib/api";

export const FileTree = async () => {
  const results = fetchSavedNotebooks();
  return <Tree className="w-full h-full relative z-50" initialSlelectedItemId="3" />;
};
