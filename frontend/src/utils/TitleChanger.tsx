import { Helmet } from "react-helmet";

export const TitleChanger = (props: { title: string }) => {
  return (
    <Helmet>
      <title>{props.title} | Bazaar Insights</title>
    </Helmet>
  );
};
