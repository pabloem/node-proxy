var http = require('http'),
    httpProxy = require('http-proxy'),
    cluster = require('cluster'),
    url = require('url');

if(cluster.isMaster) {
    cluster.fork();
    cluster.fork();
    cluster.on('exit',function(worker) {
        console.log("We lost worker: " +worker.id);
        cluster.fork();
    });
} else {
var proxy = httpProxy.createProxyServer({});

http.createServer(function(req, res) {
    var hostname = req.headers.host.split(":")[0];
    var pathname = url.parse(req.url).pathname;

    console.log(hostname + ' - '+pathname);
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
            break;
        default:
            proxy.web(req, res, {target: 'http://0.0.0.0:8081'});
    }
}).listen(80, function() {
    console.log('proxy listening on port 80');
});
}
