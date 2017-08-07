export default {
  entry: 'src/index.js',
  disableCSSModules: false,
  multipage: true,
  extraBabelPlugins: [
    "transform-runtime"
  ],
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
      ]
    },
    production: {
      hash: true,
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        classnames: 'classNames',
        moment: 'moment',
      },
    }
  },
}
