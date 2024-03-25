import React from 'react';
import Image from 'next/image';

const CircularAnimation: React.FC = () => {
    return (
        <div className="butterfly-container">
          <button className="center-button">Click!</button>
          <div className="butterfly">
            <Image src="/image/pointer2.png" alt="Butterfly" width={30} height={30} style={{ "transform": "rotate(-15deg)"}} />
          </div>
        </div>
      );
};

export default CircularAnimation;
