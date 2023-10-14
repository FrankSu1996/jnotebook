import * as esbuild from "esbuild-wasm";

import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // loads index file
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check to see if we have already fetched the file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately
        if (cachedResult) return cachedResult;
      });

      // loads css files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const data = await fetch(args.path);

        const dataText = await data.text();
        const escapedText = dataText
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escapedText}';
          document.head.appendChild(style);
        `;

        // store response in cache
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", data.url).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
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
