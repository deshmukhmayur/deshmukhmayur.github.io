module.exports = (config) => {
  config.addPassthroughCopy('src/img')
  config.addPassthroughCopy('src/styles')
  config.addPassthroughCopy('src/scripts')

  config.addWatchTarget('src/**/*.html');

  return {
    htmlTemplateEngine: 'njk',
    dir: {
      input: './src',
      output: './build',
    },
  }
}
