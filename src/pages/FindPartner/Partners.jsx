import React from "react";
import { use } from "react";
import PartnerCard from "./PartnerCard";

const Partners = ({ partnersPromise }) => {
  const partners = use(partnersPromise);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-4 place-items-center">
      {partners.map((partner) => (
        <PartnerCard key={partner._id} partner={partner} />
      ))}
    </div>
  );
};

export default Partners;
