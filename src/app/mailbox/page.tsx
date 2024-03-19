"use client";

import ReceivedLetters from "@/components/ReceivedLetters";
import { useSession } from "next-auth/react";

export default function MailBox() {
  const { data: session } = useSession();

  console.log("sfsdffs", session);

  if (!session) {
    return <p>로그인이 필요합니다</p>;
  }

  // @ts-ignore
  const sendUserId = session?.user?._id;

  return (
    <div>
      <ReceivedLetters userId={sendUserId} />
    </div>
  );
}
