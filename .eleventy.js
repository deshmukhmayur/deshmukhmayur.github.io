module.exports = (config) => {
  config.addPassthroughCopy('src/img')
  config.addPassthroughCopy('src/styles')
  config.addPassthroughCopy('src/scripts')

  return {
    htmlTemplateEngine: 'njk',
    dir: {
      input: './src',
      output: './build',
    },
  }
}
