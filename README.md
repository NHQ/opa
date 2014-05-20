# OPA!

A quick command line bundler for prototyping front-end modules using [browserify](https://github.com/substack/node-browserify). As of the latest version of OPA, it uses browserify via [watchify](https://github.com/substack/watchify)

```bash
npm install -g watchify opa
```
Now create a new app folder using opa:

```
opa -c myAppDirname
cd myAppDirname
```

opa -c creates everything you need to get started.  There's an index.js, for your module, an entry.js for your pre-bundle, and a public folder for serving it all up.

Now write your module in index.js, and module.export it.

index.js
```js
module.exports = function(x){return x + 4}
```

in your entry.js, do:
```js
var fn = require('./')
console.log(fn(12))
```

then whip up the server with opa:
```
opa -e entry.js -o public/bundle.js
```
You app will be served up at a your localhost, port 11001 or greater.
Note that all arguments are passed to browserify, so you can use browserify to full effect.


