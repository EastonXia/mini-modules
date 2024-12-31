import { resolve } from "path";

// const H5_NAME = "zzc-taro-h5";
// const H5_LIBRARY_NAME = "$zzcTaroH5";
// const H5_CHUNK_LOADING_GLOBAL = "$zzcTaroH5_webpack";

const ROOT = resolve(__dirname, "..");
// const COMPONENTS_ENTRY = resolve(ROOT, "src/components/index.ts");
// const ASSETS_ROOT = resolve(ROOT, "src/assets");
// const STYLE_ROOT = resolve(ROOT, "src/style");
// const STYLE_ENTRY = resolve(ROOT, "src/style/index.scss");
// const H5_PROJECT = resolve(ROOT, "packages", H5_NAME);

const OUTPUT_ROOT = 'dist/' + process.env.TARO_ENV;

export {
  OUTPUT_ROOT,
};
