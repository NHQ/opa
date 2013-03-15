# OPA!

A quick command line bundler for prototyping front-end modules using [browserify](https://github.com/substack/node-browserify)

```bash
npm install -g browserify opa
```

Just whip up a module and 
```bash
opa -n -e *your-module.js*
// server running at http://localhost:11001
```
OPA will bundle your file, and serve it in an index.html
If you have a static directory already, opa will write the bundle to it
OPA!

## options
```
-e [path to file.js] : declare your entry file, default looks for entry.js or index.js
-o [path to bundled file.js] : sets your bundle path, defaults to bundle.js
-s [static dir] : set the root dir for your public directory, defaults looks for static/ or public/
-n : tells opa you don't have a static dir, so it uses its own to serve your bundle
-p [port number] : set port number, defaults to 11001
-d the app directory. defaults to the current directory. This can also be passed as the first argument w/o '-d'
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
just
```
cd myApp/
opa
```

opa will write your bundle to the public/static directory, and serve files from it, using [ecstatic](https://github.com/jesusabdullah/node-ecstatic).

# Example

opa defaults to the current directory, so you can simply
``` bash
$ cd app/
$ opa
open http://localhost:11001
```
or use it on a single file and it will be served in an empty HTML file 
```bash
/app$ cd ..
$ opa -n -p 3000
open http://localhost:3000
```

# license

MIT

