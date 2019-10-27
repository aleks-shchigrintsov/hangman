module.exports = {
  devServer: {
      // commented PROXY host for Oxford dictionaly API as wordsList endpoint is not availible for now
      // proxy: 'https://oed-api.oxforddictionaries.com/',

      // Using possible solution for get random words
      proxy: 'https://randomwordgenerator.com/',
  }
}