import { CodeCell } from "@/components/ui/code-cell";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Page() {
  return (
    <div>
      <ThemeToggle />
      <CodeCell />
    </div>
  );
}
