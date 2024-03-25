"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ReceivedLetters: React.FC<{ userId: string }> = ({ userId }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/getReceivedLetters?userId=${userId}`);
      // const response = await fetch(`/api/getReceivedLetters`);
      if (response.ok) {
        const data = await response.json();
        setLetters(data);
      } else {
        alert("Failed to fetch received letters");
      }
    })();
  }, [userId]);

  return (
    <div>
      <h2>받은 편지함</h2>
      {letters.length > 0 ? (
        <ul>
          {letters.map((letter: any, index: number) => (
            <li key={index}>
              <Link href={`/mailbox/${letter._id}`}>
                <p>제목: {letter.title}</p>
              </Link>
              <p>보낸시간: {new Date(letter.send_date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No letters received yet.</p>
      )}
    </div>
  );
};

export default ReceivedLetters;
