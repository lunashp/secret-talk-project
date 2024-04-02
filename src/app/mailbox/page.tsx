"use client";

import LoginError from "@/components/error/LoginError";
import ReceivedLetters from "@/components/ReceivedLetters";
import { useSession } from "next-auth/react";

export default function MailBox() {
  const { data: session } = useSession();

  console.log("sfsdffs", session);

  if (!session) {
    return <LoginError/>;
  }

  // @ts-ignore
  const sendUserId = session?.user?._id;

  return (
    <div>
      <ReceivedLetters userId={sendUserId} />
    </div>
  );
}
