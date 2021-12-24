module.exports = api => {
  api.render('./template')

  api.extendPackage({
    scripts: {
      proxy: 'node ./nice-proxy/commander.js'
    }
  })
}