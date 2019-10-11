USE s_malldb; /*s_malldb를 사용하겠다*/
show tables;/* 테이블 보는 명령어*/

/*테이블 생성*/
/*제품 테이블 : 상품 이름, 가격, 상품 사진, 상품 정보*/
CREATE TABLE product (
  p_name VARCHAR(32) NOT NULL,
  price INT(11) NULL,
  image BLOB NULL,
  info VARCHAR(100) NULL,  
  PRIMARY KEY (p_name)
);

/*공지 테이블 : 공지 제목, 공지 내용, 업로드 날짜*/
CREATE TABLE notice(
title varchar(100) not NULL,
content varchar(100) NULL,
upload_date DATE NULL,
PRIMARY KEY (title)
);

/*문의 테이블: 문의 제목, 답변 내용, 업로드 날짜*/
CREATE TABLE faq(
title varchar(100) not NULL,
content varchar(100) NULL,
upload_date DATE NULL,
PRIMARY KEY (title)
);

/*장바구니 테이블: 사용자 id, 상품 이름, 상품 수량*/
CREATE TABLE shopping_basket(
 id varchar(20) NOT NULL,
 p_name varchar(100) NOT NULL,
 p_count TINYINT(3),
 PRIMARY KEY(id,p_name)
);

/*TODO : address와 e-mail와 phone_number의 경우 중복될 수 있음(정규화 필요)*/
/*사용자 정보 테이블: 사용자 id, 사용자 이름, 사용자 e-mail, 사용자 주소, 사용자 전화번호*/
CREATE TABLE user_info(
 id varchar(20) NOT NULL,
 user_name varchar(10),
 e_mail varchar(30),
 address varchar(50),
 phone_number varchar(20),
 PRIMARY KEY(id)
);

/*주문조회 테이블: 조회 번호, 사용자 id, 주문 상태, 송장 번호*/
CREATE TABLE order_tracking(
 tracking_num varchar(20) NOT NULL,
 id varchar(20),
 order_state varchar(30),/* ex) 입금 확인중, 상품 준비중*/
 invoice_number varchar(40), 
 PRIMARY KEY(tracking_num)
);
