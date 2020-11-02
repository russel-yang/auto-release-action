import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import resolve from '@rollup/plugin-node-resolve';

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
      resolve(),
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
