import {defineConfig} from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        cli: "src/cli.ts",
        errors: "src/index.ts"
    },
    format: ["cjs", "esm"], // Build for commonJS and ESmodules
    dts: true, // Generate declaration file (.d.ts)
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: true,
    treeshake: true,
});