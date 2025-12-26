const path = require("path");

const Dotenv = require("dotenv-webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  const nodeModulesDir = path.resolve(__dirname, "node_modules");

  return {
    mode: isDev ? "development" : "production",
    devtool: isDev ? "eval-source-map" : "source-map",
    context: __dirname,

    entry: "./frontend/js/index.tsx",

    output: {
      path: path.resolve(__dirname, "frontend/webpack_bundles/assets"),
      filename: isDev ? "[name].js" : "bundle.[contenthash].js",
      publicPath: "/",
      clean: true,
    },

    devServer: {
      host: "0.0.0.0",
      port: 3000,
      hot: true,
      historyApiFallback: true,
      static: {
        directory: path.resolve(
          __dirname,
          "frontend/webpack_bundles/assets"
        ),
        publicPath: "/",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },

    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
          },
        },
        {
          test: /\.css$/,
          use: [
            isDev && "style-loader",
            !isDev && MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["postcss-preset-env"]],
                },
              },
            },
          ].filter(Boolean),
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev && "style-loader",
            !isDev && MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  quietDeps: true,
                },
              },
            },
          ].filter(Boolean),
        },
        {
          test: /\.(svg)$/i,
          type: "asset",
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: "asset",
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp)$/i,
          type: "asset",
        },
      ],
    },

    plugins: [
      new Dotenv({
        systemvars: true,
        allowEmptyValues: false,
      }),
      new HtmlWebpackPlugin({
        template: "./frontend/index.html",
        filename: "index.html"
      }),

      isDev && new ReactRefreshWebpackPlugin(),

      !isDev &&
      new MiniCssExtractPlugin({
        filename: "styles.[contenthash].css",
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(
              __dirname,
              "frontend/assets/images/favicon.ico"
            ),
            to: "favicon.ico",
            noErrorOnMissing: true,
          },
        ],
      }),
    ].filter(Boolean),

    resolve: {
      modules: [nodeModulesDir, path.resolve(__dirname, "frontend/js")],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },

    optimization: {
      minimize: !isDev,
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
