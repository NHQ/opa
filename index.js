#!/usr/bin/env node
var http = require('http')
,   ecstatic = require('ecstatic')
,   path = require('path')
,   net = require('net')
,   orgv = require('optimist').argv
,   vargs = require('minimist')(process.argv.slice(2))
,   fs = require('fs')
,   cors = require('corsify')
,   spawn = require('child_process').spawn
,   openSesame = require('sesame-stream')
,   port = orgv.p || 11001
,   watch = orgv.w ? false : true
,   public = 'public'
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

if(orgv.e){
  app = orgv.e
}

var opts = {
    root       : dir + '/public', 
    showDir: true,
    autoIndex: true
}

var StaticPass = ecstatic(opts);

var oargs =  ['-e', app, '-o', output]

if(orgv.d) oargs.push('-d')

app = path.resolve(cwd, app)

var b = spawn('watchify', process.argv.slice(2), {cwd: process.cwd()}) //oargs)

b.stderr.on('data', function(data){ console.log(data.toString('utf8'))});

var server = http.createServer(cors(function(req, res){
    if(false && req.url === '/' + output){
      fs.createReadStream(dir + '/' + output).pipe(res)
    }

    else {
      var handled = StaticPass(req, res, next)
      function next(){
        res.writeHead(200, {'content-type' : 'text/html'})
        fs.createReadStream(dir + '/' + public + '/index.html').pipe(res)
      }
    }
}));

server.on('upgrade', openSesame)

listen(server, 11001)
//server.listen(port);

server.on('error', function(e){
  if (e.code == 'EADDRINUSE') {
    console.log('port ' + port + ' occupied. Use -p to set another port.')
    process.exit();
  }
});


function listen(server, _port){
  isPortTaken(_port, answer)
  function answer(err, b){
    if(!b) {
      server.listen(_port)
      
      server.on('listening', function(){

        if(!orgv.n) console.log('Server listening at http://localhost:' + _port)

        else console.log('An empty html page with your module is being served at http://localhost:' + _port)

      });
    }
    else {
      port = _port
      isPortTaken(++_port, answer)
    }
  }
}
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
