import path from "path";
import fs from "fs";
import packagejson from "../../package.json";

// 为 h5 产物添加 package.json
export default (ctx, options) => {
  ctx.onBuildFinish(() => {
    Object.assign(packagejson, {
      name: 'mini-modules-h5',
      types: "./types/index.d.ts",
      files: ["lib", 'style', 'types'],
      main: "index.js",
    });
    fs.writeFileSync(
      path.resolve(__dirname, '../../dist/mini-modules-h5/', "package.json"),
      JSON.stringify(packagejson, null, 2) + "\n",
      
    );
  });
};
