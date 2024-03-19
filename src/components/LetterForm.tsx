"use client";

// components/LetterForm.tsx
import { useState } from "react";
import axios from "axios";

const LetterForm: React.FC<{ userId: string }> = ({ userId }) => {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const sendLetter = async () => {
    try {
      await axios.post("/api/sendLetter", {
        senderId: userId,
        title,
        message,
      });
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <div title="제목">
        <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div title="내용">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={sendLetter}>편지 보내기</button>
      <div></div>
    </div>
  );
};

export default LetterForm;
