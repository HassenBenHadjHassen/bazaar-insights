import { useEffect, useState } from "react";
import "./Guestpage.css";
import { Link } from "react-router-dom";
import Advertisment from "../../components/Advertisment/Advertisment";

const Guestpage = () => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [filterAttempts, setFilterAttempts] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const products = [
    {
      name: "Cocoa Beans",
      buyPrice: 0.7,
      sellPrice: 5.4,
      profit: 4.7,
      profitMargin: 87.04,
      buyVolume: 3874232,
      sellVolume: 3296877,
      weekBuyTransactionVolume: 19781093,
      weekSellTransactionVolume: 58296396,
      skin: "https://skykings.net/item-images/INK_SACK:3",
    },
    {
      productId: "INK_SACK:4",
      skin: "https://skykings.net/item-images/INK_SACK:4",
      name: "Lapis Lazuli",
      buyPrice: 2.3,
      sellPrice: 6.9,
      buyVolume: 9678646,
      sellVolume: 7480662,
      weekBuyTransactionVolume: 11124893,
      weekSellTransactionVolume: 124854102,
      profit: 4.6,
      profitMargin: 66.67,
    },
    {
      skin: "https://skykings.net/item-images/ENCHANTMENT_ULTIMATE_NO_PAIN_NO_GAIN_2",
      name: "Enchanted Ultimate No Pain No Gain 2",
      buyPrice: 0,
      sellPrice: 0.4,
      buyVolume: 0,
      sellVolume: 15,
      weekBuyTransactionVolume: 389,
      weekSellTransactionVolume: 397,
      profit: 0.4,
      profitMargin: 100,
    },
  ];

  const handleFilterClick = () => {
    if (filterAttempts > 0) {
      setFilterAttempts(filterAttempts - 1);
    }
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

  return (
    <div className="guestview">
      <header className="guestview_header">
        <h1>Bazaar Insights - Guest View</h1>
        <p>Sign up to unlock more products and advanced features!</p>
      </header>

      <section className="guestview_products">
        <h2>Top 3 Bazaar Flip Products</h2>
        <div className="guestview_products_list">
          {products.map((product, index) => (
            <div key={index} className="guestview_product_card">
              <img src={product.skin} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">Buy Price: {product.buyPrice} coins</p>
              <p className="price">Sell Price: {product.sellPrice} coins</p>
              <p className="price">Profit: {product.profit} coins</p>
              <p className="price">Profit Margin: {product.profitMargin}%</p>
              <p>Buy Volume: {product.buyVolume.toLocaleString()} units</p>
              <p>Sell Volume: {product.sellVolume.toLocaleString()} units</p>
              <p>
                Weekly Buy Transactions:{" "}
                {product.weekBuyTransactionVolume.toLocaleString()} coins
              </p>
              <p>
                Weekly Sell Transactions:{" "}
                {product.weekSellTransactionVolume.toLocaleString()} coins
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="guestview_filters">
        <h2>Filter Options</h2>
        <p>Remaining Filter Attempts: {filterAttempts}/3</p>
        <button onClick={handleFilterClick} className="guestview_filter_button">
          Apply Filter
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
  );
};

export default Guestpage;
