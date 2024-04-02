"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const defaultLogin = () => {
  signIn("default", { callbackUrl: "/mailbox" });
};

export default function LoginBtn() {
  return <button className="navbar-button mr5" onClick={defaultLogin}>로그인</button>;
}

export function LogOutBtn() {
  return (
    <button
      className="navbar-button"
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
    <button className="navbar-button" onClick={handleButtonClick} style={{ cursor: "pointer" }}>
      회원가입
    </button>
  );
}
