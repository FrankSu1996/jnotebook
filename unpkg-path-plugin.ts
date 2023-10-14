import * as esbuild from "esbuild-wasm";
import path from "path";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") return { path: args.path, namespace: "a" };

        if (args.path.includes("./") | args.path.includes("../")) {
          return {
            namespace: "a",
            path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/").href,
          };
        }
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              const react = require('react@16.0.0');
              const reactDOM = require('react-dom');
              console.log(react, reactDOM);
            `,
          };
        }

        const data = await fetch(args.path);

        return {
          loader: "jsx",
          contents: await data.text(),
          resolveDir: new URL("./", data.url).pathname,
        };
      });
    },
  };
};
