module.exports = {
    chainWebpack: config => {
      config.externals({
        webglUtils: 'webglUtils'
      })
    }
  }