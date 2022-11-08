# Property Resource Bundle Loader for Webpack

Loads .properties files into JavaScript as precompiled functions using [dot-properties] and [messageformat].

Property values are parsed directly as ICU MessageFormat. With the default options, will assume that the filename has `_` separated parts, of which the second is the two- or three-letter language code [as in Java Resource Bundles].

[dot-properties]: https://www.npmjs.com/package/dot-properties
[messageformat]: https://messageformat.github.io/
[as in java resource bundles]: https://docs.oracle.com/javase/9/docs/api/java/util/ResourceBundle.html#getBundle-java.lang.String-java.util.Locale-java.lang.ClassLoader-

## Installation

```sh
npm install messageformat-properties-loader
```

## Usage

For a working demo of the following, run `npm install && npm run build` in the [`example/`](./example/) directory, and then open `example/dist/index.html` in a browser.

#### Webpack configuration

```js
{
  test: /\.properties$/,
  loader: 'messageformat-properties-loader',
  options: {
    biDiSupport: false,  // enables bi-directional text support
    defaultLocale: 'en', // used if resolution from filename fails
    encoding: 'auto',    // .properties file encoding, use one of
                         // 'auto', 'latin1', or 'utf8'
    keyPath: false,      // if true, dots '.' key names will result
                         // in multi-level objects -- use a string
                         // value to customize
    pathSep: '_'         // separator for parsing locale from filename
  }
}
```

Default option values are shown above, though none are required.

#### messages_en.properties

```
errors.confirmation: {src} doesn't match {attribute}
errors.accepted: {src} must be accepted
errors.wrong_length: {src} is the wrong length (should be {count, plural, one{1 character} other{# characters}})
errors.equal_to: {src} must be equal to {count}
```

#### example.js

```js
import messages from './messages_en.properties'

messages.errors.accepted({ src: 'Terms' })
// 'Terms must be accepted'

messages.errors.wrong_length({ src: 'Foo', count: 42 })
// 'Foo is the wrong length (should be 42 characters)'
```
