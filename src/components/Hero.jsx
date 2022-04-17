import React from "react";
import HeroImage from "../assets/images/hero.svg";
import "../assets/css/Hero/HeroComponent.css";

export default function Hero() {
  return (
    <div className="hero__main">
      <section className="hero__text">
        <p className="para_1">The world's #1 most-trusted crytocurrency tracker.</p> <br/>
        <p className="para_2">Today's <span style={{color:'#fe6546'}}>Crytocurrency</span></p>
        <p className="para_2">Prices by Crypto King</p> <br/>
        <p className="para_3">
          Crypto King lets you check the latest price of top hundred
          crypto currency coins
        </p>
      </section>
      <section className="hero__image">
        <img src={HeroImage} alt="" />
      </section>
    </div>
  );
}
