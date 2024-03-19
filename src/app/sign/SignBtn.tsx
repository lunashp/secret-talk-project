"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const defaultLogin = () => {
  signIn("default", { callbackUrl: "/mailbox" });
};

export default function LoginBtn() {
  return <button onClick={defaultLogin}>로그인</button>;
}

export function LogOutBtn() {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      로그아웃
    </button>
  );
}

export function RegBtn() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/register");
  };
  return (
    <button onClick={handleButtonClick} style={{ cursor: "pointer" }}>
      회원가입
    </button>
  );
}
