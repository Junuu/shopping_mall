# 쇼핑몰 홈페이지 제작
- version 1 : 기반적인 UI만 구현
- version 2 : kakao login api 구현
- version 3 : Database 연동 구현
- version 4 : css 디자인 부분 개선



### 사용법
1. Nodejs, Mysql, Atom 편집기가 설치되어 있어야 합니다.(atom 편집기는 필수가 아닙니다.)
2. main.js , shopping_mall.css , shopping_mall.js 파일을 다운받습니다.
3. Mysql에 s_malldb.sql파일을 복사붙여넣기하여 실행 후 테이블 밑 데이터를 추가합니다.
4. main.js mysql.connection password 부분에 사용자가 사용하는 mysql password를 입력합니다.
5. shopping_mall.js 부분에 kakao.init() 부분에 본인의 app key를 입력합니다.
6. cmd 창을 열고  cd 명령어를 사용하여 node가 설치되어있는 폴더로 이동합니다.
7. nodejs mysql을 연동하기 위해 npm install mysql --save 명령어를 입력합니다.
8. 서버를 실행하기 위해 node main.js 명령어를 입력합니다.
9. 웹브라우저를 열고 주소에 localhost:3000 을 입력합니다.

### 작동 원리
- nodejs 를 사용하여 정적인 웹이 아닌 하나의 동적인 웹을 만들었으며 db.query()함수를 사용하여 db의 값을 받아와 웹에 표시합니다.

- 로그인은 카카오로그인 api를 사용하여 구현하였습니다.

- 주문조회는 form 태그를 이용하여 post방식으로 입력된 값을 데이터베이스의 id와 비교하여 id가 일치한다면 데이터베이스에 저장된 주문내역들을 화면에 나타나도록 합니다.

- 장바구니 기능은 미구현 : 쿠키,세션기능이 필요함 (제품 화면에서 장바구니 담기 버튼을 만든 후 callback함수를 통해 db table에 값을 추가하고 id를 입력받아 form 태그를 통한 post 값 전송으로 서버에서 값을 비교하여 장바구니 리스트를 표현할 수 있습니다. )
