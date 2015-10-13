var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    url = require('url');

http.createServer(function(req, res) {
    var hostname = req.headers.host.split(":")[0];
    var pathname = url.parse(req.url).pathname;

    console.log(pathname);
    switch(hostname)
    {
        case 'www.hanja.me':
            proxy.web(req, res, {target: 'http://0.0.0.0:8081'});
            break;
        case 'hanja.me':
            proxy.web(req, res, {target: 'http://0.0.0.0:8081'});
            break;
        case 'chess.iampablo.me':
            proxy.web(req,res, {target: 'http://0.0.0.0:8080'});
        default:
            proxy.web(req, res, {target: 'http://0.0.0.0:8081'});
    }
}).listen(80, function() {
    console.log('proxy listening on port 80');
});

