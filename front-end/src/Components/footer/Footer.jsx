import React from 'react'
import"./footer.css";
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur tempore magnam iste commodi ullam facilis fuga eligendi tempora rerum, eos iusto blanditiis incidunt, consequatur quibusdam amet officia voluptate sed? Quo?</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} />
                    <img src={assets.twitter_icon} />
                    <img src={assets.linkedin_icon} />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>  
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-234-635-7890</li>
                    <li>contact@tomato.com</li>
                </ul>

            </div>   
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 @ Tomato.com ~ All Rights Reserved</p>
    </div>
  )
}

export default Footer