const http = require("http"), URL = require('url').URL;

http.createServer(function (request, response){

    const item_num = new URL(request.url, 'http://localhost').searchParams.get("item_num");

    var item_lst = ["milk", "bread", "eggs", "flour"];

    response.writeHead(200, {'Content-Type': 'text/plain'});

    response.end(item_lst[item_num]);
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');