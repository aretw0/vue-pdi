module.exports = {
    chainWebpack: config => {
      config.externals({
        openCV: 'cv'
      })
    }
  }