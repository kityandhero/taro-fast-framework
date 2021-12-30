import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";

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
    typescript({
      tsconfig: "tsconfig.json",
    }),
    resolve({
      preferBuiltins: false,
    }),
    postcss({
      inject: { insertAt: "top" },
    }),
    commonjs({
      include: "node_modules/**",
    }),
    babel({
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", "ts", "tsx"],
      babelHelpers: "runtime",
    }),
  ],
  output: {
    entryFileNames: "[name].js",
    dir: "es",
    chunkFileNames: "[name].js",
    format: "es",
    sourcemap: false,
  },
};
