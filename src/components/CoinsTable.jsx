import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/css/Table/CoinsTable.css";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import SearchIcon from "@mui/icons-material/Search";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function CoinsTable() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { currency } = CryptoState();

  const fetchCoinList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setList(data);
    setLoading(false);
  };
  console.log(list);
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
          {loading ? (
            <CircularProgress />
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
            </>
          )}
        </TableContainer>
      </article>
    </div>
  );
}
