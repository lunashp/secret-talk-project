"use effect"

import React, { useState, useEffect } from 'react';

type TypingAnimationProps = {
  fullText: string; 
  initialDelay?: number; // 초기 딜레이
  duration?: number; // 텍스트가 보여지는 지속 시간
  emoji?: string; // 이모티콘 로딩 때문에 추가
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({ fullText, initialDelay=0, duration = 0, emoji }) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDelayed, setIsDelayed] = useState(true); // 초기 딜레이 상태를 관리
  const [animationCompleted, setAnimationCompleted] = useState(false); // 애니메이션 완료 상태를 관리
  const [emojiLoaded, setEmojiLoaded] = useState(false);// 이모티콘 로딩 완료 상태 관리

  useEffect(() => {
    if (isDelayed) {
        // 초기 딜레이를 처리하기 위한 setTimeout
        const delayTimeoutId = setTimeout(() => {
          setIsDelayed(false); // 초기 딜레이가 끝났음을 표시
        }, initialDelay);
  
        return () => clearTimeout(delayTimeoutId);
      }

    if (!isDelayed && index < fullText.length && !animationCompleted) {
      const timeoutId = setTimeout(() => {
        setText((prevText) => prevText + fullText.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }, 70);

      return () => clearTimeout(timeoutId);
    }
  }, [index, fullText, isDelayed, initialDelay, animationCompleted]);

  useEffect(() => {
    if (index === fullText.length && !emojiLoaded) {
      const emojiTimeoutId = setTimeout(() => {
        setEmojiLoaded(true); // 이모티콘 로딩 완료
      }, 100); // 100ms 후에 이모티콘 로딩
  
      return () => clearTimeout(emojiTimeoutId);
    }
  }, [index, emojiLoaded, fullText.length]);

  //텍스트가 전부 표시된 후 지정된 시간이 지나면 텍스트를 비움
  /*useEffect(() => {
    if (index === fullText.length && fullText.length > 0 && !animationCompleted) {
      const clearTextTimeoutId = setTimeout(() => {
        setText('');
        setIndex(0); // 텍스트를 비운 후 인덱스도 초기화
        setAnimationCompleted(true); // 애니메이션 완료 상태를 true로 설정하여 재실행 방지
      }, duration);

      return () => clearTimeout(clearTextTimeoutId);
    }
  }, [index, fullText.length, duration, animationCompleted]);*/

  return <div className="talk-text">{text}{emojiLoaded && emoji}</div>;
};

export default TypingAnimation;