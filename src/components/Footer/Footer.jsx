import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>

      <div className="footer-container">
        <div className="footer-col">
          <img
            src="src/assets/images/logo1.png"
            className="logo-img"
          />
        </div>

        <div className="footer-col social">
          <h3>FOLLOW US:</h3>
          <ul>
            <li>
              TIKTOK
            </li>
            <li>
              TWITTER
            </li>
            <li>
              INSTAGRAM
            </li>
          </ul>
          <p className="copyright">Copyright © Elo Drinks</p>
        </div>

        <div className="footer-col address">
          <p>
            SÃO PAULO
          </p>
          <p>Rua Cenerino Branco de Araújo, 684</p>
          <p>+55 (11) 99486-3100</p>
          <p className="dev-credit">
            DEVELOPED BY THE TEAM OF <br />
            <strong>GANGUE DA VAN BRANCA</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
