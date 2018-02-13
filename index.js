const { parse } = require('dot-properties')
const loaderUtils = require('loader-utils')
const MessageFormat = require('messageformat')

module.exports = function (input) {
  let { biDiSupport, locales, path } = loaderUtils.getOptions(this)
  const translations = parse(input, path || false)
  const mf = new MessageFormat(locales)
  if (biDiSupport) mf.setBiDiSupport()
  return mf.compile(translations).toString('module.exports')
}
