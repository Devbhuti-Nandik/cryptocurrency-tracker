import React from "react";
import "../assets/css/Footer/FooterComponent.css";
import Logo from "../assets/images/logo.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <div className="footer__main">
      <div className="footer__logo">
        <div
          style={{
            display: "flex",
            alignContent: "center",
            textAlign: "center",
            marginLeft: "15%",
          }}
        >
          <div style={{ marginRight: 5 }}>
            <img src={Logo} alt="Logo" width={50} height={50} />
          </div>
          <h3 className="logo">Crypto King</h3>
        </div>
      </div>
      <div className="footer__border"></div>
      <div className="footer__link">
        <h1>Contact us at:</h1>
        <div
          style={{ display: "flex", marginTop: "3%", justifyContent: "space-evenly" }}
        >
          <FacebookIcon sx={{ color: "white", fontSize: 40 }} />
          <TwitterIcon sx={{ color: "white", fontSize: 40 }} />
          <LinkedInIcon sx={{ color: "white", fontSize: 40 }} />
        </div>
        <div>
        <h4 style={{color:"white",fontSize:'1.3rem',marginTop:'3.2%',letterSpacing:'2px'}}>&copy; Nandik Devbhuti || 2022</h4>
        </div>
      </div>
    </div>
  );
}
