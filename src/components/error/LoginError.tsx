import AnimatedImage from "../animation/AnimatedImage";
import Image from "next/image"
import TypingAnimation from "../animation/TypingAnimation";

export default function LoginError(){
    return(
        <div className="error-page-bg">
            <div className="error-page">
                <div className="eLogin-title">LOGIN PLEASE</div>
                <div className="error-talk-img">
                    <AnimatedImage src="/image/talk1.png" transform="" delay={100} width={350} height={260} alt="말풍선"/>
                    <TypingAnimation fullText="로그인 좀 해주시겠어요?" emoji="🙏" initialDelay ={1000} />
                </div>
                <div className="error-owl-img">
                    <Image src="/image/error-owl.png" width={270} height={270} alt=""/>
                </div>
            </div>
        </div>
    )
}