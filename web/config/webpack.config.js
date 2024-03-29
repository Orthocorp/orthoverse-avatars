/** @returns {import('webpack').Configuration} Webpack Configuration */
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
var webpack = require('webpack')

module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }

  config.module.rules.push({
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve('path-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        // "process/browser": require.resolve("process/browser")
        // ethereum-auth requirements
        util: require.resolve(`util/`),
        url: require.resolve(`url/`),
        assert: require.resolve(`assert/`),
        os: require.resolve(`os-browserify/browser`),
        crypto: require.resolve(`crypto-browserify`),
      },
    },
  })

  config.plugins.push(
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    })
  )

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  return config
}
