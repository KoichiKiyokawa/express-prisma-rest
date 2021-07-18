import { BuildOptions } from "esbuild";

export const baseOption: BuildOptions = {
  bundle: true,
  entryPoints: ["src/index.ts"],
  minify: true,
  outdir: "dist",
  platform: "node",
  sourcemap: true,
  target: "node14",
};
