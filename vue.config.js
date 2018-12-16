module.exports = {
    chainWebpack: config => {
      config.externals({
        openCV: 'opencv'
      })
    }
  }