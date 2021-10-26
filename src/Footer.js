import React from "react";
import './styles.css';

export default function Footer() {
    return (
        <footer>
            <p>©  <a href='https://arjundev.netlify.app'>Arjun.Dev</a></p>
            <div className='socialmedia'>
            <a href= 'https://www.linkedin.com/in/arjunvc'>
                <img src="assets/icons/icons8-linkedin.svg" alt=''/>
              </a>
              <a href= 'https://github.com/ArjunGTX'>
                <img src="assets/icons/icons8-github.svg" alt=''/>
              </a>
              <a href= 'https://www.twitter.com/im_arjunvc'>
                <img src="assets/icons/icons8-twitter.svg" alt=''/>
              </a>
            </div>
            <p>Powered by <a href='https://unsplash.com'>unsplash</a> & <a href='https://www.weatherapi.com'>Weather Api</a>.</p>
          </footer>
    )
}