
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const { htmlWebpackPluginTemplateCustomizer } = require('template-ejs-loader');
const enabledSourceMap = process.env.NODE_ENV !== 'production';

const filePath = {
  js: './src/js/',
  ejs: './src/ejs/',
  sass: './src/scss/',
};

/* Sass */
const entriesScss = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, `${filePath.sass}**/**.scss`)], {
  ignore: path.resolve(__dirname, `${filePath.sass}**/_*.scss`),
})();

/*const cssGlobPlugins = (entriesScss) => {
  return Object.keys(entriesScss).map(
    (key) =>
      new MiniCssExtractPlugin({
        filename: `./assets/css/${key}.css`,
      }),
  );
};*/

/* EJS */
const entries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, `${filePath.ejs}**/*.ejs`)], {
  ignore: path.resolve(__dirname, `${filePath.ejs}**/_*.ejs`),
})();
const htmlGlobPlugins = (entries) => {
  return Object.keys(entries).map(
    (key) =>
      new HtmlWebpackPlugin({
        filename: `${key}.html`,
        template: htmlWebpackPluginTemplateCustomizer({
          htmlLoaderOption: {
            sources: false,
            minimize: false,
          },
          templatePath: `${filePath.ejs}${key}.ejs`,
        }),
        inject: false,
        minify: false,
      })
  );
};

/* TypeScript */
const entriesTS = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, `${filePath.js}*.ts`)])();
// console.info(entriesTS);

const app = {
  entry: entriesTS,
  output: {
    filename: 'assets/js/[name].js',
    path: path.resolve(__dirname, 'public'),
    chunkFilename: 'assets/js/chunk.[name].js',
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, 'src'),
    hot: true,
    open: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: ['html-loader', 'template-ejs-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするためのローダー
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          // PostCSS
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [require('autoprefixer')({ grid: true })],
              },
            },
          },
          // Sass
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  resolve: {
    // 拡張子を配列で指定
    extensions: ['.ts', '.js'],
  },
  target: 'web',
  //プラグインの設定
  plugins: [
    //...cssGlobPlugins(entriesScss),
    new MiniCssExtractPlugin({
      filename: './assets/css/[name].css',
    }),
    ...htmlGlobPlugins(entries),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images/'),
          to: path.resolve(__dirname, 'public/assets/images'),
        },
      ],
    }),
  ],
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/, //正規表現で指定
  },
};

module.exports = app;
