import React from 'react';
import '../../styles/LandingPage.css';
import { CoffeeAnimation } from '../';

export const LandingPage = () => {
  return (
    <div>
      <div className="section1">
        <div className="landingTitleBox">
          <div className="landingTitle">
            <p>Welcome to Coffee to Go</p>
          </div>
          <div className="landingText">
            <p>Everything and more about the favourite beverage of the world</p>
          </div>
        </div>
      </div>
      <div className="section2">
        <div className="animationHolder">
          <CoffeeAnimation />
        </div>
        <div className="section2Text">
          <p>Visit our online store and check out our amazing products!</p>
          <div className="landingImgHolder">
            <div className="landImg1"><img src="../assets/images/firstitem.png" alt="coffee" width="250" height="250"/></div>
          <div className="landImg2"><img src="../assets/images/seconditem.png" alt="coffee" width="250" height="250"/></div>
          <div className="landImg3"><img src="../assets/images/thirditem.png" alt="coffee" width="250" height="250"/></div>
          </div>
        </div>
      </div>

      <div className="section3">
        <div className="teamholder">
          <div className="teammate1"></div>
          <div className="teammate2"></div>
            <div className="teammate3"></div>
            <div className="teammate4"></div>
            <div className="teammate5"></div>
            <div className="teammate6"></div>
        </div>
      </div>
    </div>
  );
};
