#!/usr/bin/env node
var http = require('http')
,   static = require('ecstatic')
,   bff = require('browserify')
,   path = require('path')
,   orgv = require('optimist').argv
,   fs = require('fs')
,   port = orgv.p || 11001
,   watch = orgv.w ? false : true
,   public = orgv.s || 'static'
,   output = 'bundle.js'
,   app = 'index.js'
,   cwd = process.cwd()
,   dir
;

//bff.tansform('brfs');

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

var bfopts = {
  watch: watch
}

var bundle = bff(bfopts);

bundle.addEntry(dir + '/' + app);

bundle.on('bundle', write)

bundle.on('syntaxError', console.error);

function write(cb){
  fs.writeFile(dir + '/'+ public  +'/' + output, bundle.bundle(), cb || function(){})
};

var opts = {
    root       : dir + '/' + public, 
    baseDir    : '/',
    autoIndex  : true,
    defaultExt : 'html'
}

write(function(){

  var server = http.createServer(static(opts)).listen(port);

  server.on('listening', function(){
    console.log('http://localhost:'+ port + '/') 
  })

});
