const path = require("path"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  devMode = process.env.NODE_ENV !== 'production',
  webpackMode = devMode ? "development" : "production"

let vendorPath = path.resolve(__dirname, 'node_modules'),
  sourcePathJS = path.resolve(__dirname, 'src/js'),
  targetPathJS = path.resolve(__dirname, 'static/js'),
  sourcePathCSS = path.resolve(__dirname, 'src/sass'),
  targetPathCSS = path.resolve(__dirname, 'static/css');

let js_config = {
  entry: `${sourcePathJS}/main.js`,
  output: { path: targetPathJS, filename: "bundle.js" },

  mode: webpackMode,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          "babel-loader"
        ]
      }
    ]
  }
};

let css_config = {
  entry: `${sourcePathCSS}/main.scss`,
  output: { path: targetPathCSS, filename: "[name].js" },

  mode: webpackMode,

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false }
          },
          {
            loader: 'sass-loader',
            options: { includePaths: [ vendorPath ] }
          }
        ],
      }
    ]
  }
};

module.exports = [js_config, css_config];
