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
    <div className="letter-form">
      <ul className="input_list">
          <li>
            <div className="inner">
              <div className="label_wrap">
                <label htmlFor="">제목</label>
              </div>
              <div className="input_wrap_style">
                <input type="text" className="input_style" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요."/>
              </div>
            </div>
          </li>
          <li>
            <div className="inner">
              <div className="label_wrap">
                <label htmlFor="">내용</label>
              </div>
              <div className="input_wrap_style">
                <textarea
                  className="send_letter_textarea input_style"
                  placeholder="내용을 입력해주세요."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          </li>
      </ul>
      <button onClick={sendLetter}>편지 보내기</button>
    </div>
  );
};

export default LetterForm;
