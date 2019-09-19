/*모듈 호출*/
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
const Module_template = require('./foo.js');

var server = http.createServer(function(request, response) {
  var _url = request.url;
  var pathname = url.parse(_url).pathname;
  var ext = path.extname(pathname); /* 확장자 반환*/
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;
  var active_home = "";
  var active_product ="";
  var active_shopping_basket="";
  var active_order_tracking="";
  var active_faq="right";

  if(pathname ==='/' || pathname ==='/shopping_mall.css' || pathname ==='/shopping_mall.js')
  {
  fs.readFile(`data/${queryData.id}`,'utf8', function(err,data){
    var description = data;

    if(queryData.id === undefined)
    {
      title = 'Home';
      active_home = "active";
    }
    else if(queryData.id === 'product')
    {
      active_product = "active";
    }
    else if(queryData.id === 'shopping_basket')
    {
      active_shopping_basket ="active";
    }
    else if(queryData.id === 'order_tracking')
    {
      active_order_tracking = "active";
    }
    else
    {
      active_faq = "right_active" ;
    }

    if(ext){
    if(ext ==='.css'){
     response.writeHead(200, {'Content-Type': 'text/css'});
    }
    else if(ext === '.js'){
     response.writeHead(200, {'Content-Type': 'text/javascript'});
    }
     response.write(fs.readFileSync(__dirname + pathname, 'utf8'));
    }
    else{
     response.writeHead(200, {'Content-Type': 'text/html'});

    }
    var template= Module_template.HTML(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
    response.end(template);
   })
 }
 else
 {
    response.writeHead(404);
    response.end('not Found');
 }
})

server.listen(3000);
