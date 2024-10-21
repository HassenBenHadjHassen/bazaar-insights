import { useEffect, useState } from "react";
import "./Guestpage.css";
import { Link, useLocation } from "react-router-dom";
import Advertisment from "../../components/Advertisment/Banner";
import Popunder from "../../components/Advertisment/Popunder";
import FilterPopup from "../../components/FilterPopup/FilterPopup";
import { GuestViewModel } from "../../viewModels/Guestpage/GuestViewModel";
import { BazaarProducts, ComparisonType } from "../../utils/types";

const Guestpage = () => {
  const viewModel = GuestViewModel.GetInstance();
  const location = useLocation();

  const [items, setItems] = useState<BazaarProducts[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [filterAttempts, setFilterAttempts] = useState(3);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filters, setFilters] = useState(viewModel.DEFAULT_FILTERS);
  const [editing, setEditing] = useState({ active: false, name: null });
  const [inputValue, setInputValue] = useState(0);
  const [inputComparison, setInputComparison] = useState<ComparisonType>(">=");

  useEffect(() => {
    async function loadGuestData() {
      await viewModel.getGuest(
        timeLeft,
        filterAttempts,
        setFilterAttempts,
        setTimeLeft
      );
    }
    loadGuestData();
  }, []);

  useEffect(() => {
    async function getItems() {
      await viewModel.getGuestItems(filters, setLoading, setItems);
    }

    getItems();
  }, [filters]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateGuest = async () => {
      await viewModel.updateGuestFun(filterAttempts, timeLeft);
    };

    updateGuest();
  }, [location]);

  const formatTime = (seconds: number) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const ad1 = {
    key: "7ef70a0124d63967dac8d9228b2fc2b7",
    format: "iframe",
    height: 90,
    width: 728,
    params: {},
  };

  const ad2 = {
    key: "bddcfd42f788d188dab19eba5f192c71",
    format: "iframe",
    height: 600,
    width: 160,
    params: {},
  };

  const ad3 = {
    key: "947d6bd4d35d928eafc88b3e26190348",
    format: "iframe",
    height: 300,
    width: 160,
    params: {},
  };

  return (
    <div className="guestpage-container">
      <div className="advertisement-left">
        <Advertisment style={{ marginTop: "3rem" }} atOptions={ad2} />
      </div>
      <div className="guestview">
        {showFilterPopup && filterAttempts > 0 && (
          <FilterPopup
            filters={filters}
            setFilters={setFilters}
            editing={editing}
            setEditing={setEditing}
            inputValue={inputValue}
            setInputValue={setInputValue}
            inputComparison={inputComparison}
            setInputComparison={setInputComparison}
            setShowFilterPopup={setShowFilterPopup}
            setLoading={setLoading}
            setItems={setItems}
            setFilterAttempts={setFilterAttempts}
            filterAttempts={filterAttempts}
          />
        )}
        <Popunder />
        <header className="guestview_header">
          <h1>Bazaar Insights - Guest View</h1>
          <p>Sign up to unlock more products and advanced features!</p>
        </header>

        <section className="guestview_products">
          <h2>Top 3 Bazaar Flip Products</h2>
          <div className="guestview_products_list">
            {loading ? (
              <div className="guestview_loading"></div>
            ) : (
              items.map((product, index) => (
                <div
                  key={index}
                  className={`guestview_product_card ${
                    index === 0 || timeLeft === 0 ? "glitch" : ""
                  }`}
                >
                  <img src={product.skin} alt={product.productName} />
                  <h3>{product.productName}</h3>
                  <p className="price">Buy Price: {product.buyPrice} coins</p>
                  <p className="price">Sell Price: {product.sellPrice} coins</p>
                  <p className="price">Profit: {product.profit} coins</p>
                  <p className="price">
                    Profit Margin: {product.profitMargin}%
                  </p>
                  <p>Buy Volume: {product.buyVolume.toLocaleString()} units</p>
                  <p>
                    Sell Volume: {product.sellVolume.toLocaleString()} units
                  </p>
                  <p>
                    Weekly Buy Transactions:{" "}
                    {product.weekBuyTransactionVolume.toLocaleString()} coins
                  </p>
                  <p>
                    Weekly Sell Transactions:{" "}
                    {product.weekSellTransactionVolume.toLocaleString()} coins
                  </p>
                  {index === 0 && (
                    <div className="signup_glitch_overlay_text">
                      Sign up to see this content
                    </div>
                  )}
                  {index !== 0 && timeLeft === 0 && (
                    <div className="signup_glitch_overlay_text">
                      Sign up to see this content
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        <section className="guestview_filters">
          <h2>Filter Options</h2>
          <p>Remaining Filter Attempts: {filterAttempts}/3</p>
          <button
            onClick={() =>
              viewModel.handleFilterClick(showFilterPopup, setShowFilterPopup)
            }
            className="guestview_filter_button"
          >
            Filter
          </button>
          {filterAttempts === 0 && (
            <p className="guestview_filter_warning">
              No more filter attempts. <Link to="/sign-up">Sign up</Link> for
              more.
            </p>
          )}
        </section>

        <section className="guestview_timer">
          <h2>Daily Access Timer</h2>
          <div className="timer">
            {timeLeft > 0 ? (
              <span className="time">{formatTime(timeLeft)}</span>
            ) : (
              <span>Time's up</span>
            )}
          </div>
          <p>
            Sign up to get <b>10 filter</b> attempts and <b>1 hour</b> of daily
            access!
          </p>
        </section>

        <section className="guestview_signin">
          <h2>Want more features?</h2>
          <p>
            <Link to="/sign-up">Sign up now</Link> to unlock exclusive insights,
            enhanced trading capabilities, and much more!
          </p>
        </section>

        <div className="guestview_advertisment">
          <Advertisment atOptions={ad1} />
        </div>
      </div>

      <div className="advertisement-right">
        <Advertisment style={{ marginTop: "3rem" }} atOptions={ad3} />
      </div>
    </div>
  );
};

export default Guestpage;
