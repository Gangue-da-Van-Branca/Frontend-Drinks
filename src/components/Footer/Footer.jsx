import React from "react";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../assets/images/logo1.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>

      <div className="footer-container">
        <div className="footer-col">
          <img src={logo} className="logo-img" />
        </div>

        <div className="footer-col social">
          <h3>FOLLOW US:</h3>
          <ul>
            <li>
              <AiFillTikTok />
              TIKTOK
            </li>
            <li>
              <FaSquareXTwitter />
              TWITTER
            </li>
            <li>
              <FaSquareInstagram />
              INSTAGRAM
            </li>
          </ul>
          <p className="copyright">Copyright © Elo Drinks</p>
        </div>

        <div className="footer-col address">
          <p>SÃO PAULO</p>
          <p><FaMapMarkerAlt />Rua Cenerino Branco de Araújo, 684</p>
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
