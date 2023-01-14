const { socials } = require('./site.json')

module.exports = function () {
  return Object.entries(socials).reduce((acc, account) => {
    if (typeof account[1] === 'string') {
      return acc
    }
  
    acc.push({
      site: account[0],
      ...account[1]
    })
  
    return acc
  }, [])
}
