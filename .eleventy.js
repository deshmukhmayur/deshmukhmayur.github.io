const autoprefixer = require('autoprefixer')
const htmlmin = require('html-minifier')
const postcss = require('postcss')
const postcssImport = require('postcss-import')
const postcssMediaMinmax = require('postcss-media-minmax')
const postcssCsso = require('postcss-csso')
const esbuild = require('esbuild')
const { isProduction } = require('./src/_data/env')

module.exports = (config) => {
  config.addPassthroughCopy({'./src/public/': '.'})
  config.addWatchTarget('src/**/*')

  config.setTemplateFormats([
    'html',
    'css',
    'json',
    'ts'
  ])

  config.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (content, path) => {
      if (path !== './src/index.css') {
        return
      }

      return async () => {
        let output = await postcss([
          postcssImport,
          postcssMediaMinmax,
          autoprefixer,
          postcssCsso,
        ]).process(content, {
          from: path,
        })
        return output.css
      }
    },
  })

  config.addExtension('ts', {
    outputFileExtension: 'js',
    compile: async (_, path) => {
      if (path !== './src/scripts/index.ts') {
        return;
      }
      return async () => {
        let output = await esbuild.build({
          target: 'es2020',
          entryPoints: [path],
          minify: isProduction,
          bundle: true,
          write: false,
        })
        return output.outputFiles[0].text
      }
    }
  })

  if (isProduction) {
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
