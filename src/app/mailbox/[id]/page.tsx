"use client";

import ReceivedLetterDetail from "@/components/ReceivedLetterDetail";

export default function MailBoxDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <ul>
        <li><ReceivedLetterDetail letterId={params.id} /></li>
      </ul>
    </div>
  );
}
