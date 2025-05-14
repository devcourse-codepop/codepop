// 이름: 한글(자음포함), 영어 대소문자, 숫자로만 구성, 1~10자
export const fullNameRegex = /^[a-zA-Zㄱ-ㅎ가-힣0-9]{1,10}$/;

// 이메일: 첫 글자 영어만 허용, 특수문자 금지, 도메인 영어만, 확장자 2~5자
export const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]{2,5}$/;

// 비밀번호: 영어, 숫자, 특수문자 각각 1자 이상 포함, 8~16자
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
