// "use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * 타입 지정
 */
interface LetterDetail {
  send_user_id: string;
  receive_user_id: string;
  message: string;
  title: string;
  is_read: boolean;
}

export default function ReceivedLetterDetail({
  letterId,
}: {
  letterId: string;
}) {
  const [letter, setLetter] = useState<LetterDetail | null>(null);
  // 답장 메시지를 위한 상태 추가
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/getReceivedLetterDetail?letterId=${letterId}`
      );
      if (response.ok) {
        const data = await response.json();
        setLetter(data);
      } else {
        alert("Failed to fetch received letters");
      }
    })();
  }, [letterId]);

  const sendLetter = async () => {
    if (letter) {
      try {
        await axios.post("/api/sendReply", {
          title: " [re]" + letter.title,
          receive_user_id: letter.send_user_id,
          send_user_id: letter.receive_user_id,
          message: replyMessage,
        });
        setReplyMessage("");
        // Handle success, e.g., show a success message

        alert("답장을 성공적으로 보냈습니다.");
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message
        alert("답장을 보내는 데 실패했습니다.");
      }
    }
  };

  return (
    <div className="sendLetter-form" >
      <div className="letterhead">
        {letter && (
          <>
            <p>{letter.message}</p>
          </>
        )}
      </div>
        <div className="sendLetter_box">
          {letter && (
            <>
              <textarea
                className="sendLetter_textarea"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="답장을 입력하세요..."
              />
              <div className="sendLetterBtn_box">
                <button className="sendLetterBtn" onClick={sendLetter}>답장하기</button>
              </div>
            </>
          )}
        </div>
    </div>
  );
}
