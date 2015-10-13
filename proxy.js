var http = require('http')
, httpProxy = require('http-proxy');

httpProxy.createServer({
  hostnameOnly: true,
  router: {
    'www.hanja.me': '127.0.0.1:8080',
    'hanja.me': '127.0.0.1:8080',
    'chess.iampablo.me' : '127.0.0.1:8081'
  }
}).listen(80);
