"use client";

import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
// import router from "next/router";
import React, { useEffect, useState } from "react";

// Letter 인터페이스 정의
interface Letter {
  _id: string;
  title: string;
  send_date: string; // 또는 Date 타입으로 정의 가능
  is_read: boolean;
}

const ReceivedLetters: React.FC<{ userId: string }> = ({ userId }) => {
  // useState에 Letter 인터페이스 타입 적용
  const [letters, setLetters] = useState<Letter[]>([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/getReceivedLetters?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setLetters(data);
      } else {
        alert("Failed to fetch received letters");
      }
    })();
  }, [userId]);

  const handleLetterClick = async (_id: string) => {
    const response = await fetch(`/api/markAsRead?letterId=${_id}`, {
      method: "POST",
    });

    if (response.ok) {
      // 성공적인 API 응답 후, letters 상태 업데이트
      setLetters(
        letters.map((letter) => {
          if (letter._id === _id) {
            return { ...letter, is_read: true };
          }
          return letter;
        })
      );
      // 사용자를 편지의 페이지로 리디렉션
      router.push(`/mailbox/${_id}`);
    } else {
      alert("Failed to mark the letter as read.");
    }
  };

  console.log(letters.map((a) => a.is_read));

  return (
    <div className="mailbox-form">
      {letters.length > 0 ? (
        <ul className="input_list">
            {letters.map((letter, index) => (
              <li className={`mailbox_list ${letter.is_read ? 'mailChkBg' : ''}`} key={index} onClick={() => handleLetterClick(letter._id)}>
                <div className="readChk_icon">
                  {letter.is_read ? (
                    <p>
                      <Image src="/image/checkMail_Y.png" className="mailChk-img" width={18} height={18} alt="메일확인 이미지"/>
                    </p>
                  ) : (
                    <p>
                      <Image src="/image/checkMail_N.png" className="mailChk-img" width={18} height={18} alt="메일미확인 이미지"/>
                    </p>
                  )}
                </div>
                <div className={`mailBox_titleBox ${letter.is_read ? 'mailChkColor' : ''}`} >
                  <p className="mailBox_title" style={{ cursor: "pointer"}}>제목: {letter.title}</p>
                  <p className="mailBox_date" >보낸시간: {new Date(letter.send_date).toLocaleString()}</p>
                </div>                               
              </li>
            ))}
        </ul>
      ) : (
        <p>아직 받은 편지가 없어요.</p>
      )}
    </div>
  );
};

export default ReceivedLetters;
