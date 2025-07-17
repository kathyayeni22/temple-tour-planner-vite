import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Aaradhak. All rights reserved.</p>
      <p>Made with ❤️ for your spiritual journeys.</p>
    </footer>
  );
}

export default Footer;
