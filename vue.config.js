module.exports = {
  devServer: {
    port: 10000,
    historyApiFallback: {
      rewrites:[
        {
          from: /./,
          to: '/public/index.html'
        }
      ]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
