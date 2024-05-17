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
      setEmail("");
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
      setName("");
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
      <ul className="input_list signup">
        <li>
          <div className="inner duplicateName">
            <input
              type="text"
              id="name"
              required
              value={name}
              placeholder="닉네임 입력"
              onChange={(e) => setName(e.target.value)}
            />
            {/* <p>이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해 주세요.</p> */}
          </div>
          <button
            className="checkNameDuplicate_btn"
            type="button"
            onClick={checkNameDuplicate}
          >
            중복 검사
          </button>
        </li>
        <li>
          <div className="inner duplicateEmail">
            <input
              type="text"
              id="email"
              required
              value={email}
              placeholder="이메일 입력"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <p>이미 등록된 이메일입니다. 다른 닉네임을 입력해 주세요.</p> */}
          </div>
          <button
            className="checkNameDuplicate_btn"
            type="button"
            onClick={checkEmailDuplicate}
          >
            중복 검사
          </button>
        </li>
        <li>
          <div className="inner">
            <input
              type="password"
              id="password"
              required
              value={password}
              placeholder="비밀번호 입력"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </li>
        <li>
          <div className="inner passwordMismatch">
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              placeholder="비밀번호 재입력"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            {/* <p>비밀번호가 일치하지 않습니다. 다시 입력해 주세요.</p> */}
          </div>
        </li>
      </ul>
      <div className="signup_btn_box">
        <button type="submit" className="signup_btn">
          회원가입
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
