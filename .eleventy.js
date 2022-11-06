const htmlmin = require('html-minifier')
const env = require('./src/_data/env')

module.exports = (config) => {
  config.addPassthroughCopy('src/img')
  config.addPassthroughCopy('src/styles')
  config.addPassthroughCopy('src/scripts')

  config.addWatchTarget('src/**/*.html')

  if (env.isProduction) {
    config.addTransform('htmlmin', (content, outputPath) => {
      if (outputPath && outputPath.endsWith('.html')) {
        return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        })
      }
      return content
    })
  }

  return {
    htmlTemplateEngine: 'njk',
    dir: {
      input: './src',
      output: './build',
    },
  }
}
