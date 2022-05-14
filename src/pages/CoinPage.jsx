import React, { useState, useEffect } from "react";
import "../assets/css/CoinDetail/CoinDetailComponent.css";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CircularProgress from "@mui/material/CircularProgress";
import CoinHistoryGraph from "../components/CoinHistoryGraph";

export default function CoinPage() {
  let { id } = useParams();
  const [coinDetail, setCoinDetail] = useState();
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();
  const [days, setDays] = useState(1);

  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchCoinDetails = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoinDetail(data);
    setLoading(false);
  };
  console.log(coinDetail);
  useEffect(() => {
    fetchCoinDetails();
  }, [currency]);
  return (
    <div>
      <article className="cp__main">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress sx={{ display: "flex" }} />
          </div>
        ) : (
          <>
            <section className="cp__left">
              <div>
                <img
                  className="cp__left-img"
                  src={coinDetail?.image.large}
                  alt={coinDetail?.name}
                />
              </div>
              <div className="cp__left-head">
                <h3>{coinDetail?.name}</h3>
              </div>
              <div
                className="cp__left-text"
                dangerouslySetInnerHTML={{
                  __html: coinDetail?.description.en.split(". ")[0],
                }}
              />
              <div className="cp__left-text">
                <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Rank:{" "}
                </span>
                {coinDetail?.market_cap_rank}
              </div>
              <div className="cp__left-text">
                <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Market Cap: {""}
                </span>
                {symbol}
                {formatNumber(
                  coinDetail?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </div>
              <div className="cp__left-text">
                <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Liquidity Score: {""}
                </span>
                {coinDetail?.liquidity_score}
              </div>
              <div className="cp__left-text">
                <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  Official Site: {""}
                </span>
                <a href={coinDetail?.links.homepage[0]}>
                  {coinDetail?.links.homepage[0]}
                </a>
              </div>
            </section>
            <section className="cp__right">
              <CoinHistoryGraph coinDays={days} />
              <div className="cp__right-btn">
                <button
                  onClick={() => {
                    setDays(1);
                  }}
                  selected={days === 1 ? true : false}
                  style={{
                    backgroundColor: days === 1 ? "#fe6546" : "transparent",
                  }}
                >
                  24 hours
                </button>
                <button
                  onClick={() => {
                    setDays(30);
                  }}
                  selected={days === 30 ? true : false}
                  style={{
                    backgroundColor: days === 30 ? "#fe6546" : "transparent",
                  }}
                >
                  30 days
                </button>
                <button
                  onClick={() => {
                    setDays(90);
                  }}
                  selected={days === 90 ? true : false}
                  style={{
                    backgroundColor: days === 90 ? "#fe6546" : "transparent",
                  }}
                >
                  3 months
                </button>
                <button
                  onClick={() => {
                    setDays(365);
                  }}
                  selected={days === 365 ? true : false}
                  style={{
                    backgroundColor: days === 365 ? "#fe6546" : "transparent",
                  }}
                >
                  1 year
                </button>
              </div>
            </section>
          </>
        )}
      </article>
      <Footer />
    </div>
  );
}
