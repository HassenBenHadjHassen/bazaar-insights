import React from "react";
import "./Template.css";
import Header from "../Header/Header";
import { TitleChanger } from "../../utils/TitleChanger";
import { useAuth } from "../../hooks/AuthHook";
import ScrollToTop from "../../utils/ScrollToTop";

interface TemplateProps {
  Page: React.ReactElement;
  pageName: string;
}

const Template: React.FC<TemplateProps> = ({ Page, pageName }) => {
  const { isAuthenticated } = useAuth();
  const headerButtonText = isAuthenticated ? "Account" : "Login/Signup";
  const buttonLink = isAuthenticated ? "/account" : "/login";

  return (
    <div className="template">
      <TitleChanger title={pageName} />
      <ScrollToTop />
      <Header buttonText={headerButtonText} buttonLink={buttonLink} />
      {Page}
    </div>
  );
};

export default Template;
