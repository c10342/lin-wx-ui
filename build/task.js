const { src, dest, parallel } = require('gulp');

const sass = require('gulp-sass');

const imagemin = require('gulp-imagemin');

const cssmin = require('gulp-clean-css');

const jsonmin = require('gulp-jsonminify');

const jsmin = require('gulp-uglify-es').default;

const wxmlmin = require('gulp-htmlmin');

const rename = require('gulp-rename');

const insert = require('gulp-insert');

const eslint = require('gulp-eslint7');

const gulpStylelint = require('gulp-stylelint');

const del = require('del');

const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const buildWxss = (srcPath, distPath) => () => {
  let p = src(srcPath);
  if (!isDev) {
    p = p.pipe(
      gulpStylelint({
        reporters: [{ formatter: 'string', console: true }]
      })
    );
  }
  p = p
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(
      insert.transform((contents, file) => {
        const commonScssPath = `packages${path.sep}common`;
        if (!file.path.includes(commonScssPath)) {
          const relativePath = '../common/base.wxss';
          contents = `@import '${relativePath}';${contents}`;
        }
        return contents;
      })
    )
    .pipe(
      rename((srcPath) => {
        srcPath.extname = '.wxss';
      })
    )
    .pipe(dest(distPath));

  return p;
};

const copy = (srcPath, distPath, ext) => () => {
  let p = src(`${srcPath}/*.${ext}`);
  if (ext === 'js' && !isDev) {
    p = p.pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError());
  }
  p = p.pipe(dest(distPath));
  return p;
};

const buildWxml = (srcPath, distPath) => () =>
  src(srcPath)
    .pipe(
      wxmlmin({
        removeComments: true,
        keepClosingSlash: true,
        caseSensitive: true,
        collapseWhitespace: true
      })
    )
    .pipe(dest(distPath));

const buildJson = (srcPath, distPath) => () =>
  src(srcPath).pipe(jsonmin()).pipe(dest(distPath));

const buildJs = (srcPath, distPath) => () => {
  let p = src(srcPath);
  if (!isDev) {
    p = p.pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError());
  }
  p = p.pipe(jsmin()).pipe(dest(distPath));

  return p;
};

const buildWxs = (srcPath, distPath) => () => src(srcPath).pipe(dest(distPath));

const buildImage = (srcPath, distPath) => () =>
  src(srcPath).pipe(imagemin()).pipe(dest(distPath));

const copyStatic = (srcPath, distPath) => {
  return parallel(
    copy(srcPath, distPath, 'wxml'),
    copy(srcPath, distPath, 'wxs'),
    copy(srcPath, distPath, 'json'),
    copy(srcPath, distPath, 'js'),
    copy(srcPath, distPath, 'png')
  );
};

const clean = (cleanPath) => () =>
  del(cleanPath, {
    force: true
  });

module.exports = {
  buildWxss,
  buildWxml,
  buildImage,
  buildJson,
  buildJs,
  copyStatic,
  clean,
  copy,
  buildWxs
};
