# opa

A quick command line server for prototyping [browserified](https://github.com/substack/node-browserify) front end modules and apps.

Basically this modules replaces the two step process of browseriflying your bundle and running a static server.

I use it with this little boiler code repo called [beaker](https://github.com/nhq/beaker)

If you have an app directory...

```
/myApp
  /[public|static|www]
    /css/style.css
    index.html
  /lib
  index.js
```

... opa will write your bundle to the public/static directory, and serve files from it, using [ecstatic](https://github.com/jesusabdullah/node-ecstatic).

```bash 
npm install -g opa
```
# Example

defaults to current directory, so you can simply"
``` bash
$ cd app/
$ opa
open http://localhost:11001
```
or pass a directory as the first argument
```bash
/app$ cd ..
$ opa app/ -p 3000 -e entry.js -o app.js
open http://localhost:3000
```

# options

```
-e entry file, defaults to index.js
-p port, defaults to 11001
-s directory to serve static file from. defaults to either "public", "www", or "static".
-o bundled file. defaults to bundle.js
-w sets watch to FALSE. defaults to true
-d the app directory. defaults to the current directory. This can also be passed as the first argument w/o '-d'
e```

# license

MIT

