"use client";

import { cn } from "@/lib/utils";
import { useConfig } from "@/lib/hooks/useConfig";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string;
}

export function ThemeWrapper({ defaultTheme, children, className }: ThemeWrapperProps) {
  const [config] = useConfig();

  return (
    <div
      className={cn(`theme-${defaultTheme || config.theme}`, "w-full", className)}
      style={
        {
          "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
