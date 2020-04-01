const { parse } = require('dot-properties')
const loaderUtils = require('loader-utils')
const MessageFormat = require('messageformat')
const path = require('path')
const uv = require('uv')

// expected to follow the pattern baseName_language[_script]_country_variant.properties
// source: https://docs.oracle.com/javase/9/docs/api/java/util/ResourceBundle.html#getBundle-java.lang.String-java.util.Locale-java.lang.ClassLoader-
function localeFromResourcePath(resourcePath, pathSep, defaultLocale) {
  const parts = path.basename(resourcePath).split(pathSep)
  const locale = parts[1] && parts[1].replace(/\..*$/, '').toLowerCase()
  if (locale === 'pt-pt' || (locale === 'pt' && /^pt/i.test(parts[2]))) {
    // European Portuguese is the only locale for which subtags matter
    return 'pt-PT'
  }
  return /^[a-z]{2,3}$/.test(locale || '') ? locale : defaultLocale
}

module.exports = function(content) {
  let { biDiSupport, defaultLocale, encoding, keyPath, pathSep } =
    loaderUtils.getOptions(this) || {}

  if (!encoding || encoding === 'auto')
    encoding = uv(content) ? 'utf8' : 'latin1'
  const input = content.toString(encoding)

  const translations = parse(input, keyPath || false)
  const locale = localeFromResourcePath(
    this.resourcePath,
    pathSep || '_',
    defaultLocale || 'en'
  )
  const mf = new MessageFormat(locale)
  if (biDiSupport) mf.setBiDiSupport()
  return mf.compile(translations).toString('module.exports')
}
module.exports.raw = true
