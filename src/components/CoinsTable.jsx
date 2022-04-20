import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/css/Table/CoinsTable.css";
import { Market } from "../config/api";
import { CryptoState } from "../CryptoContext";
import SearchIcon from "@mui/icons-material/Search";
import { Navigate } from "react-router-dom";

import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Graph from "../components/Graph";

export default function CoinsTable() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { currency, symbol } = CryptoState();

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(Market(currency));
    setList(data);
    //console.log(list);
    //console.log(dailyData);
    setLoading(false);
  };

  const handleSearch = () => {
    return list.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchText) ||
        coin.symbol.toLowerCase().includes(searchText)
    );
  };
  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  return (
    <div className="ct__main">
      <article className="ct__table">
        <div className="ct__search">
          <div className="ct__searchbox">
            <SearchIcon style={{ color: "#757a7c" }} />
            <input
              className="ct__searchInput"
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <TableContainer className="ct__table-main">
          <Table sx={{ minWidth: 650 }}>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress sx={{ display: "flex" }} />
              </div>
            ) : (
              <>
                <TableHead className="ct__table-head">
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>24 h %</TableCell>
                    <TableCell>Market Cap</TableCell>
                    <TableCell>Last 7 Days</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch().map((item) => {
                    let profit = item.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={() => {
                          Navigate(`/coins/${item.id}`);
                        }}
                        key={item.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            marginLeft: "10%",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              marginBottom: 10,
                              height: "3rem",
                              width: "3rem",
                            }}
                          />
                          <span
                            style={{
                              color: "white",
                              display: "block",
                              width: "50%",
                            }}
                          >
                            {item.name}
                          </span>
                          <span
                            style={{
                              color: "white",
                              textTransform: "uppercase",
                              textAlign: "center",
                            }}
                          >
                            {item.symbol}
                          </span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <span
                            style={{
                              color: "white",
                              textTransform: "uppercase",
                              textAlign: "center",
                              display: "block",
                              width: "50%",
                              marginLeft: "25%",
                            }}
                          >
                            {symbol}&nbsp;
                            {formatNumber(item.current_price.toFixed(2))}
                          </span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <span
                            style={{
                              textTransform: "uppercase",
                              textAlign: "center",
                              display: "block",
                              width: "50%",
                              marginLeft: "25%",
                              color: profit > 0 ? "#499b89" : "#c24c6e",
                              fontWeight: "bold",
                            }}
                          >
                            {profit && "+"}
                            {item.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <span
                            style={{
                              color: "white",
                              textTransform: "uppercase",
                              textAlign: "center",
                              display: "block",
                              width: "50%",
                              marginLeft: "25%",
                            }}
                          >
                            {symbol}&nbsp;
                            {formatNumber(
                              item.market_cap.toString().slice(0, -4)
                            )}
                          </span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <span
                            style={{
                              color: "white",
                              textTransform: "uppercase",
                              textAlign: "center",
                              display: "block",
                              width: "60%",
                              marginLeft: "20%",
                            }}
                          >
                            <Graph pointData={item.sparkline_in_7d.price}/>
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>
      </article>
      <div></div>
    </div>
  );
}
