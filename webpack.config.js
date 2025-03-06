module.exports = {
    resolve: {
      fallback: {
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        "fs": false, // Optional: Webpack does not support `fs` in the browser
        "net": false,
        "tls": false,
      }
    }
  };
  