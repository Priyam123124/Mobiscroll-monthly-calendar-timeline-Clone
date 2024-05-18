import React from 'react';
import './footer.css';
import applelogo from '../Apple_logo.svg';
import androidlogo from '../android-logo.svg';
import windowslogo from '../window_logo.svg';
import flag from '../usaflag.png';

const Footer = () => {
  return (
    <>
      <div className='footerbgc'>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Display Apple, Android, and Windows logos */}
          <img src={applelogo} className='footimg' width='20px' alt="Apple logo"/>
          <img src={androidlogo} className='footimg' width='29px' alt="Android logo"/>
          <img src={windowslogo} className='footimg' width='29px' alt="Windows logo"/>

          {/* Theme toggle section with a right border */}
          <div style={{ borderRight: "1px solid white", width: "108px", marginLeft: "16px" }}>
            <div style={{ display: "flex", border: "0.1px solid white", width: "90px", borderRadius: "4px" }}>
              <div style={{ color: "white", marginLeft: "4px" }}>Light</div>
              <div style={{ color: "white", marginLeft: "10px" }}>Dark</div>
            </div>
          </div>

          {/* Display USA flag and language selection */}
          <img style={{ marginLeft: "16px" }} src={flag} width='24px' height='12px' alt="USA flag"/>
          <p style={{ color: "white", marginLeft: "8px" }}>English</p>
        </div>

        {/* Link to go back to demos */}
        <div className="teleport">GO BACK TO DEMOS</div>
      </div>
    </>
  );
}

export default Footer;
