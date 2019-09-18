/*모듈 호출*/
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');

function templateHTML(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description){
  return `
    <!DOCTYPE html>
    <html lang="ko"><! language가 korean를 의미>
      <head>
        <title>페이지 제목(미정)</title>
        <meta charset="UTF-8"> <! charset=문자의 규칙 UTF-8권장 >
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link type='text/css' href='shopping_mall.css' rel='stylesheet' />
        <script type='text/javascript' src = 'shopping_mall.js' ></script>
        <! 더 자세한 mata data에 대해서 https://blog.naver.com/kira4195/221194492033>
      </head>

      <body>

        <div class="header">
          <h1>쇼핑몰 이름(미정)</h1>
          <p>간단한 소개글(미정).</p>
        </div>

        <nav>
          <div class="navbar">
            <a href="/" class="${active_home}">홈</a>
            <a href="/?id=product" class="${active_product}">제품</a>
            <a href="/?id=shopping_basket" class="${active_shopping_basket}">장바구니</a>
            <a href="/?id=order_tracking" class="${active_order_tracking}">주문 조회</a>
            <a href="/?id=faq" class="${active_faq}">FAQ</a>
          </div>
        </nav>

        <div class="row">
          <div class="side">
            <h4>로그인</h4>

            <!--text type은 입력을 받을 수 있음-->
            <!--글자수와 관계없이 길이를 정렬하고 싶음-->
            <p>
              <input type="text" name="txt1" size="20px" placeholder="아이디"><br>
              <input type="text" name="txt2" size="20px" placeholder="비밀번호">
              <input type="button" value="로그인" onclick="button_active();"><br>
            </p>
            <!--button 대신에 조금 보기좋은 디자인을 원함-->
            <p>
              <input type="button" value="회원가입" onclick="button_active();">
              <input type="button" value="ID 찾기" onclick="button_active();">
              <input type="button" value="비밀번호 찾기" onclick="button_active();">
            </p>
          </div>

          <div class="main">
            <p> Page Name : ${title}</p>
            <p> content : ${description}/<p>
          </div>
        </div>

        <div class="footer">
          <p>
            사업자등록번호:xxx-xxxx-xxx 대표:이미경<br>
            연락처: 010-2257-5300<br>
            홈페이지 작성자: 김준우<br>
          </p>
        </div>

      </body>
    </html>
   `;
}
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
    var template = templateHTML(active_home,active_product,active_shopping_basket,active_order_tracking,active_faq,title,description);
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
