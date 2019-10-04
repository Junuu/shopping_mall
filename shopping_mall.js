
var template = {
  HTML: function templateHTML(active_home , active_product , active_shopping_basket ,active_order_tracking, active_faq ,title,description){
   return `
     <!DOCTYPE html>
     <html lang="ko"><! language가 korean를 의미>
       <head>
        <title>페이지 제목(미정)</title>
        <meta charset="UTF-8"> <! charset=문자의 규칙 UTF-8권장 >
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link type='text/css' href='shopping_mall.css' rel='stylesheet' />
        <script type='text/javascript' src = 'shopping_mall.js' ></script>
        <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
        <! 더 자세한 mata data에 대해서 https://blog.naver.com/kira4195/221194492033>

        <script type="text/javascript">


        function unlinkApp(){
          Kakao.API.request({
            url: '/v1/user/unlink',
            success: function(res)
            {
              alert('앱탈퇴 완료');
              console.log(res);
            },
             fail: function(error)
             {
               console.log(error);
             }
           })
        }

         function kakaoLogout(){
           Kakao.Auth.logout(function() { alert("logout"); });
           //로그아웃 페이지로 이동
           setTimeout(function() {
             location.href="/?id=logout";
           }, 2500);

         }


         function kakaoLogin(){
           //<![CDATA[
           // 사용할 앱의 JavaScript 키를 설정해 주세요.
           Kakao.init('06e2d9c566b31c3abd99e0505291fe12');
           // 카카오 로그인 버튼을 생성합니다.
           Kakao.Auth.createLoginButton({
           container: '#kakao-login-btn',
           success: function(authObj) {
             //로그인창으로 넘어가기
             location.href="/?id=login";
             alert(JSON.stringify(authObj));
           },
           fail: function(err) {
             alert(JSON.stringify(err));
           }
           });
             //]]>
         }

         function newLogin(){
           Kakao.Auth.loginForm({
             success: function(authObj) {
               //로그인창으로 넘어가기
               location.href="/?id=login";
               alert(JSON.stringify(authObj));
             },
             fail: function(err) {
               alert(JSON.stringify(err));
             }
          })
         }

         </script>

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
             <p>

                <a id="kakao-login-btn"></a>
                <a href="http://developers.kakao.com/logout"></a>

                <script type="text/javascript">
                kakaoLogin();
                </script>
              </p>

             <p>
              <input type="button" value="로그아웃" onclick="kakaoLogout();"><br>
              <input type="button" value="앱 탈퇴" onclick="unlinkApp();"><br>
              <input type="button" value="새로운 로그인" onclick="newLogin();"><br>
             </p>

           </div>

           <div class="main">
             <p> Page Name : ${title}</p>
             <p> content : ${description}/<p>
           </div>
         </div>

         <div class="footer">
           <p>
             사업자등록번호:xxx-xxxx-xxx 대표:xxx<br>
             연락처: 010-1234-5678<br>
             홈페이지 작성자: 김준우<br>
           </p>
         </div>

       </body>
     </html>
    `;
 }

}
module.exports = template;
