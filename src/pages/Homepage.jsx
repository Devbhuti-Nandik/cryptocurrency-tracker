import React from "react";
import Banner from "../components/Banner";
import CoinsTable from "../components/CoinsTable";
import Hero from "../components/Hero";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Banner />
      <CoinsTable/>
    </>
  );
}
