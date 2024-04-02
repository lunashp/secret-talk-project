"use client";

import LoginError from "@/components/error/LoginError";
import LetterForm from "@/components/LetterForm";
import { useSession } from "next-auth/react";

export default function SendLetter() {
  const { data: session } = useSession();

  if (!session) {
    return <LoginError/>;
  }

  // @ts-ignore
  const sendUserId = session?.user?._id;

  return (
    <div className="send-letter-page">
      {/* <h1>Welcome, {session.user?.name}!</h1> */}
      <LetterForm userId={sendUserId} />
    </div>
  );
}
