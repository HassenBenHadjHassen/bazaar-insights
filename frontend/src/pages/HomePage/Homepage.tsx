import "./Homepage.css";
import HomePageInfoBox from "../../components/HomePageInfoBox/HomePageInfoBox";
import { useNavigate } from "react-router-dom";
import { handleRedirect } from "../../utils/handleRedirect";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <span className="homepage_header">
        <b>Bazaar Insights:</b> Your #1 tool for Profitable Skyblock Flips
      </span>

      <div className="homepage_subheader">
        <span>
          Maximize your Hypixel Skyblock profits with the most up-to-date bazaar
          flip recommendations, customized by your filters.
        </span>
        <span>Signup for more Benefits.</span>
      </div>

      <div className="homepage_boxes">
        <HomePageInfoBox text1="1382" text2="Products" />
        <HomePageInfoBox text1="183B" text2="Margins" />
        <HomePageInfoBox text1="60s" text2="Update Time" />
      </div>

      <div className="homepage_trynow">
        <button onClick={() => navigate("/guest")}>Try now for free</button>
        <p>*No Subscription Required*</p>
      </div>

      <img
        className="homepage_line_chart"
        src="/line-chart.png"
        alt="Line Chart"
      />
    </div>
  );
};

export default Homepage;
