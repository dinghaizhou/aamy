
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path')
 
var server = http.createServer(function(req, res){
	var staticPath = path.join(__dirname,'act');    
	var pathObj = url.parse(req.url, true);	 
	console.log(pathObj.pathname)
	if (pathObj.pathname  == "/favicon.ico") {
		return 
	}   
	var filePath = path.join(staticPath, pathObj.pathname);   													  
	var fileContent = fs.readFileSync(filePath,'binary');	  
	res.write(fileContent,'binary');
	res.end();	
});
 
server.listen(8081);
console.log('服务器已打开, 可以运行 http://localhost:8081');