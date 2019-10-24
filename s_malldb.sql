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




/*Insert Dummy Data*/
INSERT INTO `s_malldb`.`faq` (`title`, `content`, `upload_date`) VALUES ('자주묻는내용', '내용의답변', '20191011');
INSERT INTO `s_malldb`.`notice` (`title`, `content`, `upload_date`) VALUES ('공지제목', '공지내용', '20191011');
INSERT INTO `s_malldb`.`notice` (`title`, `content`, `upload_date`) VALUES ('공지날짜테스트', '공지날자테스트내용', '20191013');
INSERT INTO `s_malldb`.`order_tracking` (`tracking_num`, `id`, `order_state`) VALUES ('58904845', 'myid', '상품준비중');
INSERT INTO `s_malldb`.`order_tracking` (`tracking_num`, `id`, `order_state`, `invoice_number`) VALUES ('30587385', 'junuuid', '상품배송중', '68940385');
INSERT INTO `s_malldb`.`product` (`p_name`,`price`,`image`,`info`) VALUES ('상품이름',10000,load_file('your image path'),'상품의 정보입니다.');
INSERT INTO `s_malldb`.`shopping_basket` (`id`, `p_name`, `p_count`) VALUES ('myid', '상품이름', '3');
INSERT INTO `s_malldb`.`user_info` (`id`, `user_name`, `e_mail`, `address`, `phone_number`) VALUES ('myid', 'someone', 'example@naver.com', '서울특별시 광진구 화양동 세종대학교 입구', '01012341234');
INSERT INTO `s_malldb`.`faq` (`title`, `content`, `upload_date`) VALUES ('자주묻는내용2', '내용의답변2', '2019-10-24');
INSERT INTO `s_malldb`.`product` (`p_name`, `price`, `image`, `info`) VALUES ('상품이름2', '15000', load_file('your image path'), '상품의 정보2입니다.');
INSERT INTO `s_malldb`.`shopping_basket` (`id`, `p_name`, `p_count`) VALUES ('myid', '상품이름2', '1');
INSERT INTO `s_malldb`.`shopping_basket` (`id`, `p_name`, `p_count`) VALUES ('junuuid', '상품이름', '2');
INSERT INTO `s_malldb`.`user_info` (`id`, `user_name`, `e_mail`, `address`, `phone_number`) VALUES ('junuuid', 'someon2', 'example@daum.net', '경기도 시흥시 하중동', '01010101004');
