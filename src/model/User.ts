export interface User {
  name: string;
  email: string;
  _id: string; // MongoDB의 ObjectId를 문자열로 처리
  password?: string; // 비밀번호는 선택적 속성으로 처리할 수 있음
}
