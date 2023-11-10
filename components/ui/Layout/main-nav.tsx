import Link from "next/link";
import { ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../button";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-10 lg:space-x-10", className)} {...props}>
      <Link href="/" className="text-m font-medium transition-colors hover:text-primary text-lg flex items-center">
        <ScrollText className="mr-2" />
        React Carbon Notes
      </Link>
      {/* <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Customers
      </Link>
      <Link href="/examples/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Products
      </Link>
      <Link href="/examples/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Settings
      </Link> */}
    </nav>
  );
}
