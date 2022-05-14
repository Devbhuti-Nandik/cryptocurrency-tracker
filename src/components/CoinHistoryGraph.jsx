import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function CoinHistoryGraph({ coinDays }) {
  let { id } = useParams();
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();

  const fetchCoinData = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(id, coinDays, currency));
    setGraphData(data.prices);
    setLoading(false);
  };
  //console.log(graphData);

  useEffect(() => {
    fetchCoinData();
  }, [currency, coinDays]);
  return (
    <div>
      {!graphData ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ display: "flex" }} />
        </div>
      ) : (
        <>
          <Line
            data={{
              labels: graphData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                    : `${12 - date.getHours()}:${date.getMinutes()}AM`;
                return coinDays === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: graphData.map((coin) => coin[1]),
                  label: `Price (Past ${coinDays} Days ) in ${currency}`,
                  borderColor: "#eebc1d",
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              tooltips: {
                enabled: true,
              },
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}
