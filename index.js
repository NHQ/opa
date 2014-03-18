#!/usr/bin/env node
var http = require('http')
,   ecstatic = require('st')
,   path = require('path')
,   net = require('net')
,   orgv = require('optimist').argv
,   fs = require('fs')
,   spawn = require('child_process').spawn
,   openSesame = require('sesame-stream')
,   port = orgv.p || 11001
,   watch = orgv.w ? false : true
,   public = orgv.s || 'static'
,   output = 'bundle.js'
,   app = 'index.js'
,   cwd = process.cwd()
,   command = 'watchify'
,   dir
;

if(orgv.c){
	fs.mkdirSync(path.resolve('./', orgv.c))
	fs.writeFileSync(path.resolve('./', orgv.c) + '/index.js')
	fs.writeFileSync(path.resolve('./', orgv.c) + '/entry.js')
	spawn('cp', ['-R', __dirname + '/public', path.resolve('./', orgv.c)])
	return
}

if(process.argv[2] && process.argv[2].charAt(0).match(/[A-Za-z0-9]+/g)){
  dir = cwd + '/' + process.argv[2]
}

else{
  dir = process.cwd()
}

if(orgv.o){
  output = orgv.o
  output = path.resolve(cwd, output)
}

if(orgv.w){
  command = 'browserify'
}

var contents = fs.readdirSync(dir);

contents.forEach(function(e){
  var x  = e.toLowerCase()
  if(x=='www') public = e;
  else if(x=='public') public = e;  
  if(x=='entry.js') app = e;
})

if(orgv.e){
  app = orgv.e
}

if(orgv.n){ // no public, use local
  public = 'public';
  dir = __dirname;
}

var opts = {
    path       : dir + '/' + public, 
    index  : 'index.html',
    passthrough: true
}

var StaticPass = ecstatic(opts);

var oargs =  ['-e', app, '-o', output]

if(orgv.d) oargs.push('-d')

app = path.resolve(cwd, app)
console.log(app, output)
var b = spawn('watchify', oargs)

b.stderr.on('data', function(data){ console.log(data.toString('utf8'))});

var server = http.createServer(function(req, res){

    if(req.url === '/' + output){
		fs.createReadStream(dir + '/' + output).pipe(res)
    }

/*
    if(req.url === '/' + output){
	res.writeHead(200, {'Content-Type': 'text/javascript'});
	var b = spawn(command, ['-e', app, '-t', 'brfs', '-d']);
	b.stdout.pipe(res);
	b.stderr.on('data', function(data){ console.log(data.toString('utf8'))});
    }
*/

    else {
      var handled = StaticPass(req, res, next)
      function next(){
        res.writeHead(200, {'content-type' : 'text/html'})
        fs.createReadStream(dir + '/' + public + '/index.html').pipe(res)
      }
    }
});

server.on('upgrade', openSesame)

server.listen(port);

server.on('error', function(e){
	if (e.code == 'EADDRINUSE') {
		console.log('port ' + port + ' occupied. Use -p to set another port.')
		process.exit();
	}
});

server.on('listening', function(){

  if(!orgv.n) console.log('Server listening at http://localhost:' + port)

	else console.log('An empty html page with your module is being served at http://localhost:' + port)

});


function isPortTaken(PORT, callback) {
  var tester = net.createServer()
  tester.once('error', function (err) {
    if (err.code == 'EADDRINUSE') {
      callback(null, true)
    } else {
      callback(err)
    }
  })
  tester.once('listening', function() {
    tester.once('close', function() {
      callback(null, false)
    })
    tester.close()
  })
  tester.listen(PORT)
}
