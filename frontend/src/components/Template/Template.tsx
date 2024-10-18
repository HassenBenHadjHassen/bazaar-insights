import React from "react";
import "./Template.css";
import Header from "../Header/Header";
import { TitleChanger } from "../../utils/TitleChanger";
// import ScrollToTop from "../../utils/ScrollToTop";

interface TemplateProps {
  Page: React.ReactElement;
  pageName: string;
  headerButtonText: string;
  buttonLink: string;
}

const Template: React.FC<TemplateProps> = ({
  Page,
  pageName,
  headerButtonText,
  buttonLink,
}) => {
  return (
    <div className="template">
      <TitleChanger title={pageName} />
      {/* <ScrollToTop /> */}
      <Header buttonText={headerButtonText} buttonLink={buttonLink} />
      {Page}
    </div>
  );
};

export default Template;
