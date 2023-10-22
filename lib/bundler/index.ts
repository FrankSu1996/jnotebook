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
  try {
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
    return {
      code: result.outputFiles[0].text,
      error: undefined,
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        code: undefined,
        error: e.message,
      };
    }
  }
};
