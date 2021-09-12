const {
  buildImage,
  buildJson,
  buildWxml,
  buildWxss,
  copy,
  copyStatic,
  clean,
  buildWxs,
  buildTs
} = require("./task");

const { series, parallel, watch } = require("gulp");

const path = require("path");

const distPath = path.resolve(__dirname, "../dist");

const examplePath = path.resolve(__dirname, "../examples/dist");

let packagesPath = path.resolve(__dirname, "../packages");

packagesPath = `${packagesPath}/**`;

module.exports = {
  build: series(
    clean(distPath),
    parallel(
      buildWxss(`${packagesPath}/*.scss`, distPath),
      buildWxml(`${packagesPath}/*.wxml`, distPath),
      buildImage(`${packagesPath}/*.png`, distPath),
      buildJson(`${packagesPath}/*.json`, distPath),
      buildWxs(`${packagesPath}/*.wxs`, distPath),
      buildTs(`${packagesPath}/*.ts`, distPath)
    )
  ),
  dev: series(
    clean(examplePath),
    parallel(
      buildWxss(`${packagesPath}/*.scss`, examplePath),
      copyStatic(packagesPath, examplePath),
      buildTs(`${packagesPath}/*.ts`, examplePath)
    )
  ),
  watch: parallel(() => {
    watch(
      "../packages/**/*.scss",
      buildWxss(`${packagesPath}/*.scss`, examplePath)
    );
    watch("../packages/**/*.ts", buildTs(`${packagesPath}/*.ts`, examplePath));
    watch("../packages/**/*.wxml", copy(packagesPath, examplePath, "wxml"));
    watch("../packages/**/*.wxs", copy(packagesPath, examplePath, "wxs"));
    watch("../packages/**/*.json", copy(packagesPath, examplePath, "json"));
    watch("../packages/**/*.png", copy(packagesPath, examplePath, "png"));
  })
};
