import React from "react";
import "../assets/css/Banner/BannerComponent.css";
import ParticleBackground from "./ParticleBackground";
import SlidingCarasoul from "../components/SlidingCarasoul";

export default function Banner() {
  return (
    <>
      <div className="banner">
        <div
          style={{ position: "absolute",maxHeight:'60vh'}}
        >
          <ParticleBackground />
        </div>
        <div className="tagline__head">Fortune Favours The Brave</div>
        <div className="tagline__sub">The Front Runners</div>
        <div>
          <SlidingCarasoul />
        </div>
      </div>
    </>
  );
}
