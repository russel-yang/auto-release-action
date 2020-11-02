import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
export default [
  {
    input: "src/main.ts",
    output: {
      dir: "./dist",
      entryFileNames: "cjs/main.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: "./dist",
        rootDir: "src",
        exclude: ["./src/**/*.test.ts"],
      }),
      commonjs(),
    ],
  },
];
