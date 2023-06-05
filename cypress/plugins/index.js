// //
// const webpack = require("@cypress/webpack-preprocessor");
// const webpackOptions = {
//   resolve: {
//     extensions: [".ts", ".tsx", ".js", ".jsx"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           {
//             loader: "style-loader",
//           },
//           {
//             loader: "css-loader",
//             options: {
//               modules: true, // Włącz moduły CSS
//               importLoaders: 1,
//               esModule: true,
//             },
//           },
//         ],
//       },
//     ],
//   },
// };

// module.exports = (on) => {
//   const options = {
//     webpackOptions,
//   };
//   on("file:preprocessor", webpack(options));
// };
