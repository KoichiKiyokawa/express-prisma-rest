import { build } from "esbuild";
import { baseOption } from "./base-options";

build({ ...baseOption, watch: true });
