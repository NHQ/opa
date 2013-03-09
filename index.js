#!/usr/bin/env node
var http = require('http')
,   ecstatic = require('ecstatic')
,   path = require('path')
,   orgv = require('optimist').argv
,   fs = require('fs')
,   spawn = require('child_process').spawn
,   port = orgv.p || 11001
,   watch = orgv.w ? false : true
,   public = orgv.s || 'static'
,   output = 'bundle.js'
,   app = 'index.js'
,   cwd = process.cwd()
,   dir
;


if(process.argv[2] && process.argv[2].charAt(0).match(/[A-Za-z0-9]+/g)){
  dir = cwd + '/' + process.argv[2]
}

else{
  dir = process.cwd()
}

if(orgv.d){
  dir = orgv.d
}

if(orgv.e){
  app = orgv.e
}

if(orgv.o){
  output = orgv.o
}

var contents = fs.readdirSync(dir);

contents.forEach(function(e){
  var x  = e.toLowerCase()
  if(x=='www') public = e;
  else if(x=='public') public = e;
})

var opts = {
    root       : dir + '/' + public, 
    baseDir    : '/',
    autoIndex  : true,
    defaultExt : 'html'
}

var StaticPass = ecstatic(opts);

var server = http.createServer(function(req, res){

  if(req.url === '/' + output){
	  res.writeHead(200, {'Content-Type': 'text/javascript'});
		var b = spawn('browserify', ['-e', app, '-t', 'brfs']);
		b.stdout.pipe(res);
		b.stdout.on('syntaxError', console.error);
  }

	else StaticPass(req, res)
	
});

server.listen(port);
