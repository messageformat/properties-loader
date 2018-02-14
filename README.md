# Property Resource Bundle Loader for Webpack

Loads .properties files into JavaScript as precompiled functions using
[dot-properties] and [messageformat].

Property values are parsed directly as ICU MessageFormat. With the default
options, will assume that the filename has `_` separated parts, of which the
second is the two- or three-letter language code [as in Java Resource Bundles](https://docs.oracle.com/javase/9/docs/api/java/util/ResourceBundle.html#getBundle-java.lang.String-java.util.Locale-java.lang.ClassLoader-)

[dot-properties]: https://www.npmjs.com/package/dot-properties
[messageformat]: https://messageformat.github.io/

## Installation

```sh
npm install messageformat-properties-loader
```
or
```sh
yarn add messageformat-properties-loader
```


## Usage

For a working demo of the following, run `npm install` in the
[`example/`](./example/) directory, and then open `example/dist/index.html` in
a browser.


#### Webpack configuration

```js
{
  test: /\.properties$/,
  loader: require.resolve('messageformat-properties-loader'),
  options: {
    biDiSupport: false,  // enables bi-directional text support
    defaultLocale: 'en', // used if resolution from filename fails
    encoding: 'latin1',  // .properties file encoding
    keyPath: false,      // if true, dots '.' key names will result
                         // in multi-level objects -- use a string
                         // value to customize
    pathSep: '_'         // separator for parsing locale from filename
  }
}
```

Default option values are shown above, though none is required.


#### messages_en.properties

```
errors.format: {0} {1}
errors.messages.confirmation: doesn't match {attribute}
errors.messages.accepted: must be accepted
errors.messages.wrong_length: is the wrong length (should be {count, plural, one{1 character} other{# characters}})
errors.messages.equal_to: must be equal to {count}
```


#### example.js

```js
import messages from './messages_en.properties'
const { format, messages: errors } = messages.errors

errors.accepted()
// 'must be accepted'

format([
  'Your message',
  errors.wrong_length({ count: 42 })
])
// 'Your message is the wrong length (should be 42 characters)'
```
