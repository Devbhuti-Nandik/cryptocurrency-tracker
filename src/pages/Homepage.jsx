import React from "react";
import Banner from "../components/Banner";
import CoinsTable from "../components/CoinsTable";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Ranked from "../components/Ranked";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Banner />
      <Ranked />
      <CoinsTable />
      <Footer/>
    </>
  );
}
