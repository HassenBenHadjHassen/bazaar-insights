import "./Homepage.css";
import HomePageInfoBox from "../../components/HomePageInfoBox/HomePageInfoBox";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook";
import { useEffect, useState } from "react";
import { BazaarProducts } from "../../utils/types";
import { totalItems } from "../../services/itemsService";
import {
  totalItemsCalculated,
  totalProfitCalculated,
} from "../../utils/itemsInfoOutput";

const Homepage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [items, setItems] = useState<BazaarProducts[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await totalItems();

      if (items.success) {
        setItems(JSON.parse(items.data.message));
      }
    };

    fetchItems();
  }, []);

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
        {!isAuthenticated && <span>Signup for more Benefits.</span>}
      </div>

      <div className="homepage_boxes">
        <HomePageInfoBox
          text1={totalItemsCalculated(items) ?? "Loading"}
          text2="Products"
        />
        <HomePageInfoBox
          text1={totalProfitCalculated(items) ?? "Loading"}
          text2="Margins"
        />
        <HomePageInfoBox text1="60s" text2="Update Time" />
      </div>

      <div className="homepage_trynow">
        <button
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/guest")}
        >
          {isAuthenticated ? "Dashboard" : "Try now for free"}
        </button>
        {!isAuthenticated && <p>*No Subscription Required*</p>}
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
