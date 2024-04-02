import Image from "next/image";
import './globals.css';
import MainAnimation from './../components/animation/MainAnimation';

export default function Home() {
  return (
    <div className="main-wrap">
      <div><MainAnimation/></div>
    </div>
  );
}
