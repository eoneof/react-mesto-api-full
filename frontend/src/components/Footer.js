import React from 'react';

const date = new Date();
const currentYear = date.getFullYear();

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>
        © 2022 — {currentYear} Mesto Russia
      </p>
      <a className='footer__link link' href='https://imakedthese.xyz'>I maked these 🫘</a>
    </footer>
  );
}
export default Footer;
