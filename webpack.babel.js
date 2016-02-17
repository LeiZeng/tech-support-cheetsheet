import path from 'path'
import webpack from 'webpack'

const baseConfig = {
  target: 'web',
  cache: true,
  entry: {
    index: ['./src/index']
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?cacheDirectory', 'eslint'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      }]
  },
  output: {
    path: path.join(__dirname, 'dist/assets/'),
    filename: '[name].js',
    pathInfo: false
  },
  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  externals: []
}
const config = Object.assign({}, baseConfig)

if (process.env.NODE_ENV === 'development') {
  config.debug = true
  config.entry.index.unshift(
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server'
  )
  config.devtool = 'cheap-module-eval-source-map'
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  )
  config.devServer = {
    contentBase: './dist',
    publicPath: '/assets/',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    noInfo: false
  }
} else {
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

export default config
