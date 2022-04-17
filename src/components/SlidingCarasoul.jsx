import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/css/Carousel/Carousel.css";

import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function SlidingCarasoul() {
  const { currency, symbol } = CryptoState();
  const [trendCoins, setTrendCoins] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendCoins(data);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const settings = {
    infinite: true,
    lazyload: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    autoplaySpeed: 3000,
    autoplay: true,
    arrows: false,
    beforeChange: (current, next) => setImageIndex(next),
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <Slider className="slider" {...settings}>
        {trendCoins.map((item, idx) => {
          let profit = item.price_change_percentage_24h >= 0;
          return (
            <Link
              to={`/coins/${item.id}`}
              key={idx}
              className={idx === imageIndex ? "slide activeSlide" : "slide"}
            >
              <img src={item.image} alt={item.name} height="80" />
              <div className="coin-details">
                <span style={{fontSize:'0.8rem'}}>{item.symbol} &nbsp;</span>
                <span style={{fontSize:'0.8rem',color:profit>0?'green':'red',fontWeight:"bold"}}>
                  {profit && "+"}
                  {item.price_change_percentage_24h.toFixed(2)}%
                </span>
                <br />
                <span>
                  {symbol}
                  {formatNumber(item.current_price.toFixed(2))}
                </span>
              </div>
            </Link>
          );
        })}
      </Slider>
    </>
  );
}
