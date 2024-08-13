"use client";

import { useState } from "react";
import { styled } from "@mui/material";
import { useRouter } from "next/navigation";

// Styled components using MUI's styled
const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const InputList = styled("ul")({
  width: "600px",
  borderTop: "none",
});

const ListItem = styled("li")({
  display: "flex",
  marginTop: "30px",
  border: "none",
  alignItems: "center",
});

const InputDiv = styled("div")({
  borderBottom: "1px solid #c0c0c0",
  width: "100%",
  marginRight: "10px",
});

const Input = styled("input")({
  border: "none",
  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
  "&::placeholder": {
    fontSize: "16px",
    color: "#c0c0c0",
  },
});

const Button = styled("button")({
  borderRadius: "5px",
  width: "120px",
  height: "36x",
  color: "#c0c0c0",
  cursor: "pointer",
});

const SignupButton = styled("button")({
  backgroundColor: "#006837",
  width: "400px",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  display: "inline-block",
  fontSize: "16px",
  margin: "80px auto 0px",
  cursor: "pointer",
  borderRadius: "8px",
  boxSizing: "border-box",
});

const ErrorMessage = styled("li")({
  color: "rgb(216, 1, 1)",
});

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    passwordConfirm: "",
  });

  const router = useRouter();

  const checkEmailDuplicate = async () => {
    // 이름이 비어 있는지 확인
    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "값을 입력해주세요.",
      }));
      return; // 이름이 비어 있으면 함수 종료
    }
    const response = await fetch("/api/auth/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email }),
    });
    const data = await response.json();
    if (data.isDuplicate) {
      setErrors((prev) => ({
        ...prev,
        email: "이 이메일은 이미 사용 중입니다.",
      }));
      setFormData((prev) => ({ ...prev, email: "" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
      alert("이 이메일을 사용할 수 있습니다.");
    }
  };

  const checkNameDuplicate = async () => {
    // 이름이 비어 있는지 확인
    if (!formData.name) {
      setErrors((prev) => ({
        ...prev,
        name: "값을 입력해주세요.",
      }));
      return; // 이름이 비어 있으면 함수 종료
    }

    const response = await fetch("/api/auth/check-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: formData.name }),
    });
    const data = await response.json();
    if (data.isDuplicate) {
      setErrors((prev) => ({
        ...prev,
        name: "이 닉네임은 이미 사용 중입니다.",
      }));
      setFormData((prev) => ({ ...prev, name: "" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
      alert("이 닉네임을 사용할 수 있습니다.");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // console.log(name, value); // 상태 변화 확인을 위해 로그 출력
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (formData.password !== formData.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: "비밀번호가 일치하지 않습니다.",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, passwordConfirm: "" }));
    }

    const name = formData.name;
    const email = formData.email;
    const password = formData.password;

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //   if (response.ok) {
    //     alert("사용자 생성됨!");
    //     router.push("/api/auth/signin");
    //   } else {
    //     const errorData = await response.json(); // 서버에서 반환된 JSON 에러 메시지
    //     setErrors((prev) => ({
    //       ...prev,
    //       email: errorData.message || "서버에서 오류가 발생했습니다.",
    //     }));
    //   }
    // };

    if (response.ok) {
      const data = await response.json(); // 서버에서 반환된 JSON 데이터
      alert(data.message); // 성공 메시지 표시
      router.push("/api/auth/signin");
    } else {
      const errorData = await response.json(); // 서버에서 반환된 JSON 에러 메시지
      setErrors((prev) => ({
        ...prev,
        email: errorData.message || "서버에서 오류가 발생했습니다.",
      }));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputList>
        <ListItem>
          <InputDiv>
            <Input
              type="text"
              name="name"
              required
              value={formData.name}
              placeholder="닉네임 입력"
              onChange={handleChange}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputDiv>
          <Button type="button" onClick={checkNameDuplicate}>
            중복검사
          </Button>
        </ListItem>

        <ListItem>
          <InputDiv>
            <Input
              type="text"
              name="email"
              required
              value={formData.email}
              placeholder="이메일 입력"
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputDiv>
          <Button type="button" onClick={checkEmailDuplicate}>
            중복검사
          </Button>
        </ListItem>
        <ListItem>
          <InputDiv>
            <Input
              type="password"
              name="password"
              required
              value={formData.password}
              placeholder="비밀번호 입력"
              onChange={handleChange}
            />
          </InputDiv>
        </ListItem>
        <ListItem>
          <InputDiv>
            <Input
              type="password"
              name="passwordConfirm"
              required
              value={formData.passwordConfirm}
              placeholder="비밀번호 확인"
              onChange={handleChange}
            />
            {errors.passwordConfirm && (
              <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>
            )}
          </InputDiv>
        </ListItem>
      </InputList>
      <SignupButton type="submit">회원가입</SignupButton>
    </Form>
  );
};

export default SignupForm;
