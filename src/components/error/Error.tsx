import AnimatedImage from "../animation/AnimatedImage";
import Image from "next/image"
import TypingAnimation from "../animation/TypingAnimation";

export default function Error(){
    return(
        <div className="error-page-bg">
            <div className="error-page">
                <div className="e404-title">404</div>
                <div className="error-talk-img">
                    <AnimatedImage src="/image/talk1.png" transform="" delay={100} width={350} height={260} alt="말풍선"/>
                    <TypingAnimation fullText="페이지를 찾을 수 없어요!" emoji="😵" initialDelay ={1000} />
                </div>
                <div className="e404-owl-img">
                    <Image src="/image/404-owl.png" width={300} height={270} alt=""/>
                </div>
            </div>
        </div>
    )
}