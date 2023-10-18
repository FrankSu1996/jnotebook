import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "@/lib/bundler/plugins/unpkg-path-plugin";
import { fetchPlugin } from "@/lib/bundler/plugins/fetch-plugin";

let initialized = false;

export const bundleRawCode = async (rawCode: string) => {
  if (!initialized) {
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@latest/esbuild.wasm",
    });
    initialized = true;
  }

  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });

  return result.outputFiles[0].text;
};
