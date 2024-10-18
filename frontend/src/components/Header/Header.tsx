import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  buttonText: string;
  buttonLink: string;
}

const Header: React.FC<HeaderProps> = ({ buttonText, buttonLink }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={"/logo.png"} alt="Logo" className="logo" />
      </Link>
      <h1>Hypixel Skyblock Bazaar Flips</h1>
      <Link to={buttonLink}>
        <button className="header-button">{buttonText}</button>
      </Link>
    </header>
  );
};

export default Header;
