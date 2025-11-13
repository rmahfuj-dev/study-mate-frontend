import React from "react";
import Carousel from "./Caurosel";
import TopStudyPartners from "./TopStudyPartner";
import FAQ from "./FAQ";
import Reveiws from "./Reviews";

const Home = () => {
  return (
    <div>
      <Carousel />
      <TopStudyPartners />
      <Reveiws />
      <FAQ />
    </div>
  );
};

export default Home;
