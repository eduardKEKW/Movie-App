import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Separator from 'components/Separator';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer__follow'>
                <div className='text__upper'> Follow us on </div>
                <div className='footer__icons color-white'>
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-youtube-square"></i>
                </div>
            </div>
            <h1 className='footer__logo text__logo'>
                LOGO
            </h1>
            <div className='footer__text text__main'>
                Create a profile, follow users, rate movies and actors, make your favorites.
            </div>
        </div>
    );
}
 
export default Footer;