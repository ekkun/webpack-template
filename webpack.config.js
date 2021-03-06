// via https://note.com/youheyhey0505/n/n64771d0989a3
const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');

const config = {
  entry: './src/js/index.js',
  output: {
    //filename: 'main.js',
    filename: './js/main.js',
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].html' },
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              /*attributes: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src',
                  },
                  {
                    tag: 'img',
                    attribute: 'srcset',
                    type: 'srcset',
                  },
                  {
                    tag: 'img',
                    attribute: 'data-src',
                    type: 'src',
                  }
                ]
              },*/
              minimize: true,
              /*minimize: {
                removeComments: false,
                collapseWhitespace: false,
              }*/
            },
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        //loader: 'url-loader',
        loader: 'file-loader',
        options: {
          limit: 1024,
          name: './images/[name].[ext]',
        },
        /*test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath : 'images/',
              publicPath : path => {
                return '../' + path;
              }
            }
          }
        ]*/
      },
    ],
  },
  devServer: {
    inline: true,
    open: true,
    contentBase: outputPath,
    port: 4000,
  },
};

module.exports = config;
