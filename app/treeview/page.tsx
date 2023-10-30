import { getServerSession } from "next-auth";
import { getSavedNotes } from "@/lib/api";

export default async function Page() {
  const session = await getServerSession();
  const { data, error, status } = await getSavedNotes("franksu49@gmail.com");

  return <div className="container">hello</div>;
}
