"use client";

import LetterForm from "@/components/LetterForm";
import { useSession } from "next-auth/react";

export default function SendLetter() {
  const { data: session } = useSession();

  if (!session) {
    return <p>You need to be logged in to access this page.</p>;
  }

  // @ts-ignore
  const sendUserId = session?.user?._id;

  return (
    <div>
      <h1>Welcome, {session.user?.name}!</h1>
      <LetterForm userId={sendUserId} />
    </div>
  );
}
