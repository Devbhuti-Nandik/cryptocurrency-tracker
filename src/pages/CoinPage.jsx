import React, { useState, useEffect } from "react";
import "../assets/css/CoinDetail/CoinDetailComponent.css";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CircularProgress from "@mui/material/CircularProgress";
import CoinHistoryGraph from "../components/CoinHistoryGraph";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import houseIcon from "../assets/images/house.svg";

export default function CoinPage() {
  let { id } = useParams();
  const { currency, symbol, user, favourites, setAlert } = CryptoState();
  let navigate = useNavigate();

  const [coinDetail, setCoinDetail] = useState();
  const [loading, setLoading] = useState(false);
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

  const isFavourite = favourites.includes(coinDetail?.id);
  const addToFavourites = async () => {
    const coinRef = doc(db, "favourites", user.uid); //accessing the data from database favourites wrt user id
    try {
      await setDoc(coinRef, {
        coins: favourites ? [...favourites, coinDetail?.id] : [coinDetail?.id],
      });
      setAlert({
        open: true,
        message: `Added to your favourites`,
        type: "success",
      });
      return;
    } catch (error) {
      setAlert({
        open: true,
        message: `${error.message}.`,
        type: "error",
      });
      return;
    }
  };

  const removeFromFavourites = async () => {
    const coinRef = doc(db, "favourites", user.uid); //accessing the data from database favourites wrt user id
    try {
      await setDoc(
        coinRef,
        {
          coins: favourites.filter((favourite) => favourite !== coinDetail?.id),
        },
        { merge: "true" }
      );
      setAlert({
        open: true,
        message: `${coinDetail.name} removed from your favourites`,
        type: "success",
      });
      return;
    } catch (error) {
      setAlert({
        open: true,
        message: `${error.message}.`,
        type: "error",
      });
      return;
    }
  };
  useEffect(() => {
    fetchCoinDetails();
  }, [currency, id]);

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
              <div className="cp__button">
                <button
                  onClick={() => {
                    navigate(`/`);
                  }}
                >
                  <img
                    className="home-icon"
                    src={houseIcon}
                    alt="Go to hompage"
                  />{" "}
                  Back to Home
                </button>
              </div>
              <div
                style={{
                  display: user ? "inline-flex" : "none",
                  marginTop: user ? "3%" : "0",
                }}
              >
                <button
                  class="btn-101"
                  onClick={isFavourite ? removeFromFavourites : addToFavourites}
                  style={{ height: "3rem" }}
                >
                  {isFavourite ? "No More Favourite" : "Add To Favourites"}
                  <svg>
                    <defs>
                      <filter id="glow">
                        <fegaussianblur
                          result="coloredBlur"
                          stddeviation="5"
                        ></fegaussianblur>
                        <femerge>
                          <femergenode in="coloredBlur"></femergenode>
                          <femergenode in="coloredBlur"></femergenode>
                          <femergenode in="coloredBlur"></femergenode>
                          <femergenode in="SourceGraphic"></femergenode>
                        </femerge>
                      </filter>
                    </defs>
                    <rect />
                  </svg>
                </button>
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
