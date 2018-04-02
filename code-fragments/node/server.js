var http = require("http");
var url = require("url");

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        var query = url.parse(request.url).query;
        console.log("Get request from "+pathname+".\n");
        route(pathname);
        
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello world!");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server running on http://127.0.0.1:8888");
}

exports.start = start;