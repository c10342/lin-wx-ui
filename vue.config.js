/* eslint  camelcase: "off",node/no-path-concat: "off" */

const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const utils = require('./build/utils');

const MarkdownItContainer = require('markdown-it-container');
const vueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function () {
      return '<table class="table">';
    };
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(
      MarkdownIt.renderer.rules.fence
    );

    // ```html `` 给这种样式加个class hljs
    //  但是markdown-it 有个bug fence整合attr的时候直接加载class数组上而不是class的值上
    //  markdown-it\lib\renderer.js 71行 这么修改可以修复bug
    //  tmpAttrs[i] += ' ' + options.langPrefix + langName; --> tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    // const fence = MarkdownIt.renderer.rules.fence
    // MarkdownIt.renderer.rules.fence = function(...args){
    //   args[0][args[1]].attrJoin('class', 'hljs')
    //   var a = fence(...args)
    //   return a
    // }

    // ```code`` 给这种样式加个class code_inline
    const code_inline = MarkdownIt.renderer.rules.code_inline;
    MarkdownIt.renderer.rules.code_inline = function (...args) {
      args[0][args[1]].attrJoin('class', 'code_inline');
      return code_inline(...args);
    };
    return source;
  },
  use: [
    [
      MarkdownItContainer,
      'demo',
      {
        validate: (params) => params.trim().match(/^demo\s*(.*)$/),
        render: function (tokens, idx) {
          // const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

          if (tokens[idx].nesting === 1) {
            // const desc = tokens[idx + 2].content;
            const html = utils.convertHtml(
              utils.striptags(tokens[idx + 1].content, 'script')
            );
            // 移除描述，防止被添加到代码块
            tokens[idx + 2].children = [];

            return `<demo-block>
                          <div slot="desc">${html}</div>
                          <div slot="highlight">`;
          }
          return '</div></demo-block>\n';
        }
      }
    ]
  ]
};

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'docs/main.js',
      // 模板来源
      template: './docs/public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '组件文档',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  productionSourceMap: false,
  outputDir: utils.resolve('docs-dist'),
  devServer: {
    open: true
  },
  configureWebpack: {
    resolve: { extensions: ['.js', '.vue', '.json', 'md'] }
  },
  css: {
    sourceMap: false,
    extract: {
      filename: 'css/style.css'
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .include.add(utils.resolve('docs'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        // 修改它的选项...
        return options;
      });

    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        ...vueMarkdown
      });

    config.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [
      {
        patterns: [
          {
            from: './docs/public/static/**/*',
            to: `${__dirname}/docs-dist`,
            transformPath(targetPath, absolutePath) {
              return targetPath.replace(`docs${path.sep}public`, '');
            }
          }
        ]
      }
    ]);
  }
};
