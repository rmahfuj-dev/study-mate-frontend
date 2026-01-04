import React from "react";
import { Link } from "react-router";

const PartnerCard = ({ partner }) => {
  const id = partner._id;
  return (
    <div className="card bg-secondary shadow-md border border-base-300 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-[350px] w-full">
      <figure className="px-4 pt-4">
        <img
          src={partner.profileimage}
          alt={partner.name}
          className="rounded-full w-20 h-20 object-cover mx-auto border-2 border-primary"
        />
      </figure>
      <div className="card-body items-center text-center px-4 py-3">
        <h2 className="card-title text-lg">{partner.name}</h2>
        <p className="text-sm text-gray-400">{partner.subject}</p>
        <p className="text-sm">
          <span className="font-semibold">Mode:</span> {partner.studyMode}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Experience:</span>{" "}
          {partner.experienceLevel}
        </p>
        <div className="card-actions mt-3 w-full">
          <Link
            to={`/partner/${id}`}
            className="btn btn-primary btn-sm w-full rounded-full"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
