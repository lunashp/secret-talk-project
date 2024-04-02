import React from 'react';
import Image from 'next/image';

interface clickComponentProps {
  onButtonClick: () => void;
}

const ButterflyAnimation: React.FC<clickComponentProps> = ({onButtonClick}) => {
    return (
        <div className="butterfly-container">
          <button className="center-button" onClick={onButtonClick}>Click!</button>
          <div className="butterfly">
            <Image src="/image/pointer2.png" alt="Butterfly" width={30} height={30} style={{ "transform": "rotate(-15deg)"}} />
          </div>
        </div>
      );
};

export default ButterflyAnimation;
