"use client";

import { useState } from "react";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const checkEmailDuplicate = async () => {
    const response = await fetch("/api/auth/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.isDuplicate) {
      alert("이 이메일은 이미 사용 중입니다.");
    } else {
      alert("이 이메일을 사용할 수 있습니다.");
    }
  };

  const checkNameDuplicate = async () => {
    const response = await fetch("/api/auth/check-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    if (data.isDuplicate) {
      alert("이 닉네임은 이미 사용 중입니다.");
    } else {
      alert("이 닉네임을 사용할 수 있습니다.");
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">사용자 닉네임</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={checkNameDuplicate}>
          중복 검사
        </button>
      </div>
      <div>
        <label htmlFor="email">사용자 이메일</label>
        <input
          type="text"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={checkEmailDuplicate}>
          중복 검사
        </button>
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignupForm;
