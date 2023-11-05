import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTheme } from "next-themes";

export const Tooltip = (props) => {
  const { theme, systemTheme } = useTheme();
  let appliedTheme;
  if (theme === "system") appliedTheme = systemTheme === "dark" ? "dark" : "light";
  else {
    appliedTheme = theme === "dark" ? "dark" : "light";
  }
  return <ReactTooltip {...props} variant={appliedTheme} border={"1px solid hsl(var(--primary))"} />;
};
