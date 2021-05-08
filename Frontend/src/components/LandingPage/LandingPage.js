import React from 'react';
import '../../styles/LandingPage.css';
import { CoffeeAnimation, FetchProducts } from '../';
import firstItem from '../../assets/images/firstitem.png';
import secondItem from '../../assets/images/seconditem.png';
import thirdItem from '../../assets/images/thirditem.png';
import firstMember from '../../assets/images/viktor.jpg';
import secondMember from '../../assets/images/marci.jpg';
import thirdMember from '../../assets/images/donat.jpg';
import fourthMember from '../../assets/images/attila.jpg';
import fifthMember from '../../assets/images/csaba.jpg';
import sixthMember from '../../assets/images/mate.jpg';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  FetchProducts();
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
        <div className="teamtitle">
          <p>Meet our team</p>
        </div>
        <div className="teamholder">
          <div className="teamcard">
            <div className="teammate1">
              <img src={firstMember} alt="coffee" width="200" height="auto" />
            </div>
            <p className="nameTag">Viktor</p>
          </div>
          <div className="teamcard">
            <div className="teammate2">
              <img src={secondMember} alt="coffee" width="200" height="auto" />
            </div>
            <p className="nameTag">Marci</p>
          </div>
          <div className="teamcard">
            <div className="teammate3">
              <img src={thirdMember} alt="coffee" width="200" height="auto" />
            </div>
            <p className="nameTag">Donát</p>
          </div>
        </div>
        <div className="teamholder">
          <div className="teamcard">
            <div className="teammate4">
              <img src={fourthMember} alt="coffee" width="200" height="auto" />
            </div>
            <p className="nameTag">Attila</p>
          </div>
          <div className="teamcard">
            <div className="teammate5">
              <img src={fifthMember} alt="coffee" width="200" height="auto" />
            </div>
            <p className="nameTag">Csaba</p>
          </div>
          <div className="teamcard">
            <div className="teammate6">
              <img src={sixthMember} alt="coffee" width="200" height="auto" />
            </div>
            <p className="nameTag">Máté</p>
          </div>
        </div>
      </div>
    </div>
  );
};
