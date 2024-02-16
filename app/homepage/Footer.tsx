import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white text-sm p-16 min-h-24 text-center">
      © {new Date().getFullYear()} VetBuddy
    </footer>
  );
}

export default Footer;
