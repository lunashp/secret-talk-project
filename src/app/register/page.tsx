import { useState } from "react";

export default function Register() {
  return (
    <div>
      <form method="POST" action="/api/auth/signup">
        <input name="name" type="text" placeholder="닉네임" />
        <input name="email" type="text" placeholder="이메일" />
        <input name="password" type="password" placeholder="비밀번호" />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}
