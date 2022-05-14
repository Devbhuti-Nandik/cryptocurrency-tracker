import React, { useState, useEffect } from "react";
import "../assets/css/Ranked/RankedComponent.css";
import axios from "axios";
import { Market } from "../config/api";
import CircularProgress from "@mui/material/CircularProgress";
import Graph from "../components/Graph";
import { CryptoState } from "../CryptoContext";

export default function Ranked() {
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();

  const [topRank, setTopRank] = useState();
  const [topName, setTopName] = useState("");
  const [topImgPath, setTopImgPath] = useState("");
  const [topATH, setTopATH] = useState();
  const [topGraphPoints, setTopGraphPoints] = useState([]);

  const formatNumber = (num) => {
    if (num !== undefined)
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(Market(currency));
    data.forEach((item) => {
      if (item.market_cap_rank === 1) {
        setTopRank(item.market_cap_rank);
        setTopName(item.name);
        setTopImgPath(item.image);
        setTopATH(item.ath);
        setTopGraphPoints(item.sparkline_in_7d.price);
      }
    });
    //console.log(typeof(list.length));
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ display: "flex" }} />
        </div>
      ) : (
        <div className="ranked">
          {/*Top Rank + Name */}
          <section className="card">
            <div
              className="tab__card"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <div 
              className="mobile__card"
              style={{ textAlign: "center", marginTop: "15%" }}>
                <h1
                  style={{
                    color: "#fe6546",
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  {topName}
                </h1>
                <h1
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  Rank: {topRank}
                </h1>
              </div>
              <div
                className="tab__card-img"
                style={{
                  textAlign: "center",
                  marginTop: "20%",
                  marginLeft: "5%",
                }}
              >
                <img
                  src={topImgPath}
                  alt={topName}
                  style={{ height: "5rem", width: "5rem" }}
                />
              </div>
            </div>
          </section>
          {/*ATH*/}
          <section className="card">
            <div
              className="mobile__card"
              style={{
                textAlign: "center",
                marginTop: "20%",
              }}
            >
              <h1
                style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "1.7rem",
                }}
              >
                All Time Highest
              </h1>
              <h1
                style={{
                  color: "#fe6546",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  marginTop:'3%'
                }}
              >
                {formatNumber(topATH)} {currency}
              </h1>
            </div>
          </section>
          {/*Graph */}
          <section className="card">
            <div
              className="tab__card-dominance"
              style={{
                width: "90%",
                textAlign: "center",
                marginTop: "10%",
              }}
            >
              <h1
                style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "1.7rem",
                  marginLeft:'10%'
                }}
              >
                {topName} Dominance
              </h1>
              <div style={{marginLeft:'10%',marginTop:'3%'}}>
                <Graph pointData={topGraphPoints} />
                <h4 style={{textAlign:'right',color:'#ffffff',marginBottom:'5%'}}> 7 days</h4>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
