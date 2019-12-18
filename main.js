/*모듈 호출*/
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var qs = require('querystring');
const Module_template = require('./shopping_mall.js');
var mysql = require('mysql');

var db = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : '11111111',
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
  var track_info = "";

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
          description = "<h1>공지사항</h1><ul><li>내용<span>날짜</span></li>";
          for(var i=0;i<topics.length;i++)
          {
            temp_str = topics[i].upload_date + ""; // add "" to make string type
            description += "<li><a>" +topics[i].content + "</a><span>"+ temp_str.slice(0,10) + "</span></li>";
          }
          description += "</ul>" ;
          template= Module_template.Home(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
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
          var product_array = new Array();
          for(var i=0;i<products.length;i++)
          {
            product_array[i] =
            {
              p_name : products[i].p_name,
              p_price : products[i].price,
              p_info : products[i].info
            };
            //product_array[i] = "제품명:" + products[i].p_name + " 가격:" + products[i].price + " 상품정보:" + products[i].info;
          }
          template= Module_template.Product(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,product_array);

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
          template= Module_template.shopping_basket(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
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

          var count = 0;
          for(var i=0;i<trackings.length;i++)
          {
            if(trackings[i].id==save_id)
            {
              if(trackings[i].invoice_number == null)
              {
                invoice_number = " ";
              }

              track_info += "아이디 : " + save_id + "&emsp;&emsp;배송상태 : " + trackings[i].order_state + "&emsp;&emsp;운송장 번호 : " + trackings[i].invoice_number + "<br>";
            }
            // &emsp; = 공백 4개
            else
            {
              count = count + 1;
            }
          }
          if(trackings.length == count)
          {
            track_info = "주문 내역이 없습니다.";
          }
          template= Module_template.Order_track(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,track_info);
          response.end(template);
          });

            //description += "<br>" +trackings[i].tracking_num + " " + trackings[i].id + " " + trackings[i].order_state + " "+ trackings[i].invoice_number;
            var body ='';
            request.on('data', function(data){
              body = body + data;
            });
            request.on('end', function(){
              var post = qs.parse(body);
              save_id = post.id_txt;
              active_order_tracking = "active";

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
          description = "<h1>FAQ</h1><ul><li>질문<span>답변</span></li>";
          for(var i=0;i<faqs.length;i++)
          {
            temp_str = faqs[i].upload_date + ""; // add "" to make string type
            description += "<li><a>" +faqs[i].title + "</a><span>"+ faqs[i].content + "</span></li>";
            //+ temp_str.slice(0,10);
          }
          description += "</ul>" ;
          template= Module_template.faq(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
          response.end(template);
        });
      }
      else if(queryData.id === 'login'){
        description = "로그인 완료";
        template= Module_template.Home(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
        response.end(template);
      }
      else{//queryData.id ==='logout'
        description = "로그아웃 완료";
        template= Module_template.Home(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
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
   // 여기다가 index.html이 아닌 다른애들을 호출할 수 있다.
   //else if(pathname == '/unnamed.html'){

 //}
    response.writeHead(404);
    response.end('not Found');
 }
})

server.listen(3000);
