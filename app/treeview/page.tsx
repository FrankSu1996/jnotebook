import { getServerSession } from "next-auth";
import { getSavedNotes } from "@/lib/api";
import { SignedOutNavbarDropdown } from "@/components/ui/Layout/signedout-navbar-dropdown";

export default async function Page() {
  const session = await getServerSession();
  const { data, error, status } = await getSavedNotes("franksu49@gmail.com");

  return (
    <div className="container">
      <SignedOutNavbarDropdown />
    </div>
  );
}
