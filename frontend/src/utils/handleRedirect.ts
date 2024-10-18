import { NavigateFunction } from "react-router-dom";

export const handleRedirect = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  navigate: NavigateFunction,
  redirectLink: string
) => {
  e.preventDefault();
  navigate("/" + redirectLink);
};
