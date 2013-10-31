# OPA!

A quick command line bundler for prototyping front-end modules using [browserify](https://github.com/substack/node-browserify). As of the latest version of OPA, it uses browserify via [watchify](https://github.com/substack/watchify)

```bash
npm install -g watchify opa
```

Just whip up a module and 
```bash
opa -n -e *your-module.js*
// server running at http://localhost:11001
```
OPA will bundle your file, and serve a index.html. See [public/index.html](/public/index.html).  Your entry module will be watched for changes.
If you have a static directory already, opa serve from that.
OPA!

## options
```
-c [dirName] creates a new directory with dirName, creates index.js, entry.js, and copies OPA's public/ dir to dirName.  Useful for creating new modules.
-e [path to file.js] : declare your entry file, OPA looks for entry.js or index.js
-o [path to bundled file.js] : sets your bundle path, defaults to bundle.js
-s [static dir] : set your "public" directory if you have one. Opa will check for static/ www/ or public/, so if you have one of those, you can ignore this.
-n : tells OPA you don't have a static/public dir, so it uses its own to serve your bundle
-p [port number] : set port number, defaults to 11001
-d development - passes '-d' to browserify which makes testing easier
```

OPA uses the newest version of browserify, and also uses the [brfs](https://github.com/substack/brfs) [transform](https://github.com/substack/node-browserify#btransformtr) to turn fs.readFileSync() of any file (such as an html snippet) into strings you can use in your code.

If you have an app directory...

```
/myApp
  /[public|static|www]
    /css/style.css
    index.html
  /lib
  entry.js|index.js
```
simply:
```
cd myApp/
opa
```

opa will write your bundle to the directory, watch it for changes and serve it up. And it will serve you public dir using [ecstatic](https://github.com/jesusabdullah/node-ecstatic).

# Example

opa defaults to the current directory, looks for entry.js or index.js, and bundles it for you. So you can simply
``` bash
$ cd app/
$ opa
open http://localhost:11001
```
or use it on a single file and it will be served in an empty HTML file 
```bash
/app$ cd ..
$ opa -e _somefile.js_ -n -p 3000
open http://localhost:3000
```

# license

MIT

