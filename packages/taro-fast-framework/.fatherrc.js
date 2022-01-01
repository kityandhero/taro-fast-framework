export default [
  {
    target: "node",
    esm: {
      type: "babel",
    },
    // cjs: { type: 'babel', lazy: true },
    disableTypeCheck: true,
    // extraBabelPlugins: [
    //   [
    //     'babel-plugin-import',
    //     {
    //       libraryName: 'antd',
    //       libraryDirectory: 'es',
    //       style: true,
    //     },
    //     'antd',
    //   ],
    // ],
    autoprefixer: {
      browsers: ["ie>9", "Safari >= 6"],
    },
  },
];
