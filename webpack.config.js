const dest = './build';
const src = './src';

module.exports = {
  js: {
    src: './src/js/**',
    dest: './build/js'
  },
  main: {
    entry: './src/js/main.jsx',
    output: {
      filename: 'main.js'
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules', 'bower_components']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: require.resolve('babel-loader')
        }
      ]
    }
  }
};