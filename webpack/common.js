const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = ({ outputFile, assetFile, envFilePath, assetPath }) => {
  return {
    entry: {
      // htmlが増える毎にここに追記
      // htmlページ名:そのhtmlの親となるjsファイル
      index: path.resolve(__dirname, '../src/pages/index.js'),
      'sample/index': path.resolve(__dirname, '../src/pages/sample/index.js'),
    },
    output: {
      filename: `./js/${outputFile}.js`,
      path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
      // cssをcssファイルとして抽出する
      new MiniCssExtractPlugin({
        filename: `./css/${outputFile}.css`,
      }),
      // .envファイルを使えるようにする
      new Dotenv({ path: envFilePath }),
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'eslint-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          // transpile
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // ここの順番は重要。下から順番に実行される
            // jsにバンドルせずcssファイルとして出力する
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // プレフィックスを自動で付与する
            'postcss-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            // ここの順番は重要。下から順番に実行される
            // jsにバンドルせずcssファイルとして出力する
            MiniCssExtractPlugin.loader,
            // cssをcommonJSに変換する
            'css-loader',
            // プレフィックスを自動で付与する
            'postcss-loader',
          ],
        },
        {
          // 他の種類の静的ファイルを使用する場合は同様の記述で追加する。
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `${assetFile}.[ext]`,
                outputPath: 'assets/images/',
                // 画像の保存先によってパスを変更する。
                publicPath: `${assetPath}assets/images/`,
              },
            },
          ],
        },
        {
          test: /\.(ttf|woff2?)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `${assetFile}.[ext]`,
                outputPath: 'assets/fonts/',
                // 画像の保存先によってパスを変更する。
                publicPath: `${assetPath}assets/fonts/`,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
      ],
    },
    resolve: {
      // 絶対パスでインポートできるようにする。
      alias: {
        '@js': path.resolve(__dirname, '../src/js'),
        '@scss': path.resolve(__dirname, '../src/scss'),
        '@assets': path.resolve(__dirname, '../src/assets'),
      },
      extensions: ['.js'],
    },
  };
};
