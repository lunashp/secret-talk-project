"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import TypingAnimation from "./TypingAnimation";
import AnimatedImage from './AnimatedImage';
import CircularAnimation from './ButterflyAnimation';

export default function MainAnimation(){
    const [size, setSize] = useState({ width: "600px"});

    /* eye animation */
    useEffect(() => {
        const eyes = document.querySelectorAll('.eye');
      
        function moveEyes(event: MouseEvent) {
          eyes.forEach((eye) => {
            const eyeElement = eye as HTMLElement;
            const { left, top, width, height } = eyeElement.getBoundingClientRect();
            const eyeCenterX = left + width / 2;
            const eyeCenterY = top + height / 2;
            const radian = Math.atan2(event.pageX - eyeCenterX, event.pageY - eyeCenterY);
            const correctedRadian = radian + (-60 * Math.PI / 180);
            const distance = Math.min(eyeElement.getBoundingClientRect().width / 4, Math.sqrt(Math.pow(event.pageX - eyeCenterX, 2) + Math.pow(event.pageY - eyeCenterY, 2)) / 10);
            const moveX = Math.cos(correctedRadian) * distance;
            const moveY = Math.sin(correctedRadian) * distance;
            
            eyeElement.style.transform = `translate(${moveX}px, ${-moveY}px)`;
          });
        }
      
        window.addEventListener('mousemove', moveEyes);
      
        return () => {
          window.removeEventListener('mousemove', moveEyes);
        };
    }, []);

    /* main animation */
    useEffect(() => {
        const timer = setTimeout(() => {
            setSize({ width: "100%"});
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="main-animation">
            <div className="talk-wrap" style={{ width: size.width}}>
                <div className="talk-img1">
                    <AnimatedImage src="/image/talk1.png" transform="" delay={2000} width={400} height={260} alt="말풍선"/>
                    <TypingAnimation fullText="이 편지, 네가 대신 전해 줄 수 있을까?" emoji="🙏" initialDelay ={2500} />
                </div>
                <div className="talk-img2">
                    <AnimatedImage src="/image/talk2.png" delay={6000} width={400} height={260} alt="말풍선"/>
                    <TypingAnimation fullText="걱정 마, 내가 꼭 전해줄게!" emoji="🦉" initialDelay ={6500} />
                </div>
                <div className="talk-img3">
                    <AnimatedImage src="/image/talk3.png" delay={11000} width={350} height={260} alt="말풍선"/>
                    <TypingAnimation fullText="우와, 저기 나비가!" emoji="🦋" initialDelay ={11500}/>
                </div>
                <div className="hand-img">
                    <AnimatedImage src="/image/hand.png" delay={300} width={110} height={100} alt="손" duration={9000} />
                </div>
                <div className="letter-img">
                    <AnimatedImage src="/image/letter.png" delay={400} width={130} height={130} alt="편지"/>
                </div>
                <div className="owl-img">
                    <Image src="/image/owl.png" width={300} height={300} alt=""/>
                    <Image src="/image/left-eye.png" className="eye left-eye" width={26} height={33} alt=""/>
                    <Image src="/image/right-eye.png" className="eye right-eye" width={25} height={30} alt=""/>
                </div>
                <CircularAnimation/>
            </div>
        </div>
    )
}