# 쇼핑몰 홈페이지 제작
- version 1 : 기반적인 UI만 구현
- version 2 : kakao login api 구현
- version 3 : Database 연동 구현
- 추후게획 : 함수화, 상세기능 추가, DB 연동, 결제, 보안, 회원가입, 호스팅 및 도메인 구매, 구글 및 네이버 웹마스터 등록


사용법

1. Nodejs, Mysql, Atom 편집기가 설치되어 있어야 합니다.
2. main.js , shopping_mall.css , shopping_mall.js 파일을 다운받습니다.
3. Mysql에 s_malldb.sql파일을 복사붙여넣기하여 실행 후 테이블 밑 데이터를 추가합니다.
4. main.js mysql.connection password 부분에 사용자가 사용하는 mysql password를 입력합니다.
5. shopping_mall.js 부분에 kakao.init() 부분에 본인의 app eky를 입력합니다.
6. cmd 창을 열고  cd 명령어를 사용하여 node가 설치되어있는 폴더로 이동합니다.
7. nodejs mysql을 연동하기 위해 npm install mysql --save 명령어를 입력합니다.
8. 서버를 실행하기 위해 node main.js 명령어를 입력합니다.
9. 웹브라우저를 열고 주소에 localhost:3000 을 입력합니다.
