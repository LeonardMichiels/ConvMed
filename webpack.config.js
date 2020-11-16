const path = require('path');
const webpack = require('webpack');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  watch: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.hbs$/,
        use: `handlebars-loader?helperDirs[]=${__dirname}/src/helpers`
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HandlebarsPlugin({
      // doc: https://github.com/sagold/handlebars-webpack-plugin

      entry: path.join(process.cwd(), "src", "html", "**", "*.hbs"),
      output: path.join(process.cwd(), "dist", "[path]", "[name].html"),

      // Path to your partials
      // In your .hbs files, you must import partial with only firstParent/filename
      partials: [
        path.join(process.cwd(), "src", "partials", "**", "*.hbs")
      ],

      // register custom helpers. May be either a function or a glob-pattern
      helpers: {
        nameOfHbsHelper: Function.prototype,
        projectHelpers: path.join(process.cwd(), "src", "helpers", "**", "*.helper.js")
      },

      // data passed to main hbs template: `main-template(data)`
      //data: require("./src/data/projects.json"),
      //data: path.join(__dirname, "src/data/projects.json"),

      // hooks
      // getTargetFilepath: function (filepath, outputTemplate) {},
      // getPartialId: function (filePath) {}
      onBeforeSetup: function (Handlebars) { },
      onBeforeAddPartials: function (Handlebars, partialsMap) { },
      onBeforeCompile: function (Handlebars, templateContent) { },
      onBeforeRender: function (Handlebars, data, filename) { },
      onBeforeSave: function (Handlebars, resultHtml, filename) { },
      onDone: function (Handlebars, filename) { }
    }),
    new MiniCssExtractPlugin({
      filename: '../css/bundle.css'
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};