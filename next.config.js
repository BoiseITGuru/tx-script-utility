const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const nextTranspileModules = require("next-transpile-modules");
const withTM = nextTranspileModules(["monaco-editor", "flow-cadut"]);

module.exports = withTM({
  async headers() {
    return [
    {
      source: "/",
      headers: [
     { key: "Access-Control-Allow-Origin", value: "*" },
    ]
    }
    ]
},
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["vscode"] = require.resolve(
      "monaco-languageclient/lib/vscode-compatibility"
    );

    // config.plugins.push(
    //   new MonacoWebpackPlugin({
    //     languages: ["json"],
    //     features: [],
    //     filename: "static/[name].worker.js",
    //   })
    // );
    return config;
  },
});
