import * as esbuild from "esbuild-wasm";

import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        // check to see if we have already fetched the file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately
        if (cachedResult) return cachedResult;

        const data = await fetch(args.path);

        // store response in cache
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: await data.text(),
          resolveDir: new URL("./", data.url).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
