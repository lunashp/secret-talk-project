"use client"
// components/AnimatedImage.tsx
import  Image  from 'next/image';
import React, { useEffect, useState } from 'react';


interface AnimatedImage {
    src: string;
    delay: number;
    width: number;
    height: number;
    alt: string;
    transform?: string; // transform 값을 위한 선택적 prop 추가
    duration?: number; // 이미지가 보여지는 지속 시간
  }
  
  const AnimatedImage: React.FC<AnimatedImage> = ({ src, delay, width, height, alt, transform = '', duration=0 }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
        const showTimer = setTimeout(() => {
          setIsVisible(true);
    
          // duration이 정의된 경우, duration 후에 이미지를 사라지게 함
          if (duration) {
            const hideTimer = setTimeout(() => {
              setIsVisible(false);
            }, duration);
    
            return () => clearTimeout(hideTimer);
          }
        }, delay);
    
        return () => clearTimeout(showTimer);
      }, [delay, duration]);
  
    return (
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? transform : `translateX(-100px)`, // transform prop 사용
          transition: 'opacity 1s, transform 1s',
        }}
      >
        <Image src={src} width={width} height={height} alt=""/>
      </div>
    );
  };

  export default AnimatedImage;