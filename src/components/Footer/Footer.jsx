import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {

  const iconClasses = "text-white text-3xl mx-2.5 cursor-pointer transition-opacity hover:opacity-80";

  return (
    <footer className="bg-green-600 p-4 text-center w-full">
      <p className='text-white text-2xl font-bold'>
        For any queries, please contact us
      </p>

      <div className='flex justify-center my-4'>
        <FontAwesomeIcon
          className={iconClasses}
          icon={faInstagram}
          onClick={() => window.open('https://www.instagram.com', '_blank')}
        />
        <FontAwesomeIcon
          className={iconClasses}
          icon={faLinkedin}
          onClick={() => window.open('https://www.linkedin.com/in/Anusha-Kenchampalli', '_blank')}
        />
        <FontAwesomeIcon
          className={iconClasses}
          icon={faPinterest}
          onClick={() => window.open('https://www.pinterest.com', '_blank')}
        />
        <FontAwesomeIcon
          className={iconClasses}
          icon={faFacebook}
          onClick={() => window.open('https://www.facebook.com', '_blank')}
        />
      </div>

      <p className='text-white mt-5 text-base'>
        Copyright © 2025 MiniMart. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;