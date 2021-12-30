import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import babelPlugin from "@rollup/plugin-babel";

// 供 Loader 使用的运行时入口
export default {
  external: (d) => {
    return (
      /^react$/.test(d) ||
      /^@tarojs\/taro$/.test(d) ||
      /^@tarojs\/taro-h5$/.test(d) ||
      d.includes("@babel/runtime")
    );
  },
  input: {
    index: "src/index.ts",
    "utils/mediaDefault": "src/utils/mediaDefault.js",
    "utils/tools": "src/utils/tools.js",
  },
  plugins: [
    resolve({
      preferBuiltins: false,
    }),
    commonjs({}),
    typescript({
      tsconfig: "tsconfig.json",
    }),
    postcss({
      inject: { insertAt: "top" },
    }),
    babelPlugin({
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", "ts", "tsx"],
      babelHelpers: "runtime",
    }),
  ],
  external: ["lodash/endsWith"],
  output: {
    entryFileNames: "[name].js",
    dir: "es",
    chunkFileNames: "[name].js",
    format: "es",
    sourcemap: false,
  },
};
