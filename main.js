/*모듈 호출*/
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var mysql = require('mysql');
const Module_template = require('./shopping_mall.js');

var db = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'your password',
  database : 's_malldb'
});
db.connect();
//db.end();

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
  var description = '';
  var template = '';
  var imgaddress = '';
  //console.log(pathname); 에러확인을위한 코드

  if(pathname ==='/' || pathname ==='/shopping_mall.css' || pathname ==='/shopping_mall.js' || pathname ==='/kakao_login.js')
  {

      if(queryData.id === undefined)
      {
        db.query(`SELECT * FROM notice `, function(error,topics){
          if(error)
          {
            throw error;
          }
          title = 'Home';
          active_home = "active";
          for(var i=0;i<topics.length;i++)
          {
            temp_str = topics[i].upload_date + ""; // add "" to make string type
            description += "<br>" +topics[i].title + " " + topics[i].content + " " + temp_str.slice(0,10);
          }
          template= Module_template.BeforeLogin(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
          response.end(template);
        });
      }
      else if(queryData.id === 'product')
      {
        db.query(`SELECT * FROM product`,function(error,products){
          if(error)
          {
            throw error;
          }
          active_product = "active";
          for(var i=0;i<products.length;i++)
          {
            description += "<br>" +products[i].p_name + " " + products[i].price + " "+ products[i].info;
          }
          for(var i=0;i<products.length;i++)
          {
            console.log(products[i].image);
          }
          template= Module_template.BeforeLogin(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
          response.end(template);

        });

      }
      else if(queryData.id === 'shopping_basket')
      {
        db.query(`SELECT * FROM shopping_basket`,function(error,baskets){
          if(error)
          {
            throw error;
          }
          active_shopping_basket ="active";
          for(var i=0;i<baskets.length;i++)
          {
            description += "<br>" +baskets[i].id + " " + baskets[i].p_name + " "+ baskets[i].p_count;
          }
          template= Module_template.BeforeLogin(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
          response.end(template);
        });
      }

      else if(queryData.id === 'order_tracking')
      {
        db.query(`SELECT * FROM order_tracking`,function(error,trackings){
          if(error)
          {
            throw error;
          }
          active_order_tracking = "active";
          for(var i=0;i<trackings.length;i++)
          {
            description += "<br>" +trackings[i].tracking_num + " " + trackings[i].id + " " + trackings[i].order_state + " "+ trackings[i].invoice_number;
          }
          template= Module_template.BeforeLogin(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
          response.end(template);
        });
      }

      else if(queryData.id === 'faq')
      {
        db.query(`SELECT * FROM faq`,function(error,faqs){
          if(error)
          {
            throw error;
          }
          active_faq = "right_active" ;
          for(var i=0;i<faqs.length;i++)
          {
            temp_str = faqs[i].upload_date + ""; // add "" to make string type
            description += "<br>" +faqs[i].title + " " + faqs[i].content + " " + temp_str.slice(0,10);
          }
          template= Module_template.BeforeLogin(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
          response.end(template);
        });
      }
      else if(queryData.id === 'login'){
        description = "로그인 완료";
        template= Module_template.BeforeLogin(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
        response.end(template);
      }
      else{//queryData.id ==='logout'
        description = "로그아웃 완료";
        template= Module_template.BeforeLogin(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
        response.end(template);
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


 }
 else
 {
    response.writeHead(404);
    response.end('not Found');
 }
})

server.listen(3000);
