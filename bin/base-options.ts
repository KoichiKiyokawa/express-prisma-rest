import { BuildOptions } from "esbuild"
import pkg from "../package.json"

export const baseOption: BuildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  outdir: "dist",
  platform: "node",
  target: "node14",
  external: Object.keys(pkg.dependencies),
}
