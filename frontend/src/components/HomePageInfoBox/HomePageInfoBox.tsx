import React from "react";
import "./HomePageInfoBox.css";

interface HomePageInfoBoxProps {
  text1?: string;
  text2?: string;
}

const HomePageInfoBox: React.FC<HomePageInfoBoxProps> = ({
  text1 = "Default Title",
  text2 = "Default subtitle goes here",
}) => {
  return (
    <div className="homepage_info_box">
      <p className="info_title">{text1}</p>
      <p className="info_subtitle">{text2}</p>
    </div>
  );
};

export default HomePageInfoBox;
