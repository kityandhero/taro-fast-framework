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
    "customComponents/AppComponent/index":
      "src/customComponents/AppComponent/index.jsx",
    "customComponents/VerticalBox/index":
      "src/customComponents/VerticalBox/index.jsx",
    "utils/constants": "src/utils/constants.js",
    "utils/mediaDefault": "src/utils/mediaDefault.js",
    "utils/typeCheck": "src/utils/typeCheck.js",
    "utils/typeConvert": "src/utils/typeConvert.js",
    "utils/tips": "src/utils/tips.js",
    "utils/tools": "src/utils/tools.js",
    "utils/cacheAssist": "src/utils/cacheAssist.js",
    "utils/globalStorageAssist": "src/utils/globalStorageAssist.js",
    "utils/authority": "src/utils/authority.js",
    "utils/request": "src/utils/request.js",
    "utils/virtualRequest": "src/utils/virtualRequest.js",
    "utils/requestAssistor": "src/utils/requestAssistor.js",
    "utils/globalModel": "src/utils/globalModel.js",
    "utils/defaultSettingsSpecial": "src/utils/defaultSettingsSpecial.js",
  },
  plugins: [
    resolve({
      preferBuiltins: false,
    }),
    commonjs({
      include: ["node_modules/**", "../../node_modules/**"],
      namedExports: {
        // This is needed because react/jsx-runtime exports jsx on the module export.
        // Without this mapping the transformed import import {jsx as _jsx} from 'react/jsx-runtime' will fail.
        "react/jsx-runtime": ["jsx", "jsxs"],
      },
    }),
    typescript({
      tsconfig: "tsconfig.json",
    }),
    postcss({
      inject: { insertAt: "top" },
    }),
    babel({
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", "ts", "tsx"],
      babelHelpers: "runtime",
    }),
  ],
  external: [
    "react",
    "react-dom",
    "@tarojs/components",
    "@tarojs/runtime",
    "@tarojs/taro",
    "@tarojs/react",
    "lodash",
    "qs",
    "node-cache",
  ],
  output: {
    entryFileNames: "[name].js",
    dir: "es",
    chunkFileNames: "[name].js",
    format: "es",
    sourcemap: false,
  },
};
