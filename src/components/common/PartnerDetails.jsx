import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const PartnerDetails = () => {
  const { user } = useContext(AuthContext);
  const loadedPartner = useLoaderData();

  const [partner, setPartner] = useState(loadedPartner);
  console.log(partner);

  const handleAdd = async () => {
    try {
      const userEmail = user.email;

      const res = await fetch("http://localhost:3000/connects/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          partnerEmail: partner.email,
          partnerName: partner.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to add partner");

      Swal.fire({
        icon: "success",
        title: "Request Sent",
        text: "Partner request sent successfully!",
        confirmButtonColor: "#22c55e",
      });

      setPartner((prev) => ({
        ...prev,
        partnerCount: (prev.partnerCount || 0) + 1,
      }));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-base-200 flex justify-center py-12">
      <div className="w-full max-w-5xl bg-base-100 rounded-xl shadow-lg p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={partner.profileimage}
            alt={partner.name}
            className="w-40 h-40 rounded-full border-4 border-primary object-cover shadow-md"
          />
          <div className="flex-1 flex flex-col">
            <h1 className="text-4xl font-bold text-base-content">
              {partner.name}
            </h1>
            <div className="flex items-center mt-2 gap-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-6 w-6 ${
                    i < partner.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-500 ml-2">({partner.rating})</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-base-content">
            Profile Details
          </h2>
          <ul className="flex flex-col gap-3 text-base-content text-lg">
            <li>
              <span className="font-semibold">Subject:</span> {partner.subject}
            </li>
            <li>
              <span className="font-semibold">Study Mode:</span>{" "}
              {partner.studyMode}
            </li>
            <li>
              <span className="font-semibold">Availability:</span>{" "}
              {partner.availabilityTime}
            </li>
            <li>
              <span className="font-semibold">Location:</span>{" "}
              {partner.location}
            </li>
            <li>
              <span className="font-semibold">Experience Level:</span>{" "}
              {partner.experienceLevel}
            </li>
            <li>
              <span className="font-semibold">Partner Count:</span>{" "}
              {partner.partnerCount}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {partner.email}
            </li>
          </ul>
          <button
            onClick={handleAdd}
            className="btn bg-primary w-fit px-3 py-1 rounded-md text-white mt-4"
          >
            Send Partner Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
