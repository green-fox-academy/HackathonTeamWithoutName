import React from 'react';
import '../../styles/LandingPage.css';
import { CoffeeAnimation } from '../';
import firstItem from '../../assets/images/firstitem.png';
import secondItem from '../../assets/images/seconditem.png';
import thirdItem from '../../assets/images/thirditem.png';
import { Link } from 'react-router-dom';

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
          <Link to="/main/shop">
            <div className="goToShop">Visit the store</div>
          </Link>
          <div className="landingImgHolder">
            <Link to="/main/shop">
              <div className="landImg1">
                <img src={firstItem} alt="coffee" width="250" height="250" />
              </div>
            </Link>
            <Link to="/main/shop">
              <div className="landImg2">
                <img src={secondItem} alt="coffee" width="250" height="250" />
              </div>
            </Link>
            <Link to="/main/shop">
              <div className="landImg3">
                <img src={thirdItem} alt="coffee" width="250" height="250" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="section3">
        <div className="teamtitle"><p>Meet our team</p></div>
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
