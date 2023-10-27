import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Theme } from "../theme/themes";

export const styles = [
  {
    name: "default",
    label: "Default",
  },
  {
    name: "new-york",
    label: "New York",
  },
] as const;

export type Style = (typeof styles)[number];

type Config = {
  style: Style["name"];
  theme: Theme["name"];
  radius: number;
};

const configAtom = atomWithStorage<Config>("config", {
  style: "default",
  theme: "zinc",
  radius: 0.5,
});

export function useConfig() {
  return useAtom(configAtom);
}
