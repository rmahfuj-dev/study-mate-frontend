import React from "react";
import Carousel from "./Caurosel";
import TopStudyPartners from "./TopStudyPartner";
import FAQ from "./FAQ";
import Reveiws from "./Reviews";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <div>
      <Carousel />
      <TopStudyPartners />
      <Reveiws />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
