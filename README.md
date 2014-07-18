# famous!

A quick command line bundler for prototyping front-end, multi-user, real-time aplications using [browserify](https://github.com/substack/node-browserify). As of the latest version of OPA, it uses browserify via [watchify](https://github.com/substack/watchify)

```bash
npm install -g watchify famous
```
Now create a new app folder using famous:

```
famous -c myAppDirname
cd myAppDirname
```

famous -c creates everything you need to get started.  There's an index.js, for your module, an entry.js for your pre-bundle, and a public folder for serving it all up.

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

then whip up the server with famous:
```
famous -e entry.js -o public/bundle.js
```
Your app will be served up at a your localhost, port 11001 or greater.
You can edit the code, and b/c we're using watchify, your bundle will update automatically.  You have to refresh the page tho.
Note that all arguments to famous are passed to browserify, so you can use browserify to full effect.


