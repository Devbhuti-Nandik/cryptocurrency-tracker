import React from "react";
import "../assets/css/Header/Logo.css";
import "../assets/css/Header/Header.css";
import Logo from "../assets/images/logo.svg";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import User from "./Authentication/User";

export default function Header() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const { currency, setCurrency, user } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static" className="navbar">
        <Container>
          <Toolbar>
            <Link to={"/"} style={{ flex: 1 }}>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: 5 }}>
                  <img src={Logo} alt="Logo" width={30} height={30} />
                </div>
                <h3 className="logoText">Crypto King</h3>
              </div>
            </Link>
            <Select
              className="header__selectbox"
              variant="outlined"
              style={{ width: 100, height: 40, marginLeft: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ? <User/> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
