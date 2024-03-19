"use client";

import ReceivedLetterDetail from "@/components/ReceivedLetterDetail";

export default function MailBoxDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <ReceivedLetterDetail letterId={params.id} />
    </div>
  );
}
