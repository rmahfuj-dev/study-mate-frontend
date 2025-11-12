import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const PartnerDetails = () => {
  const partner = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [partnerCount, setPartnerCount] = useState(partner.patnerCount || 0);

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      // Increment partner count
      const resCount = await fetch(
        `http://localhost:3000/partners/${partner._id}/increment`,
        { method: "PATCH" }
      );
      if (!resCount.ok) throw new Error("Failed to update partner count");
      const updatedPartner = await resCount.json();
      setPartnerCount(updatedPartner.patnerCount);

      // Save partner request
      const userEmail = localStorage.getItem("userEmail"); // logged-in user
      const resRequest = await fetch("http://localhost:3000/partnerRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerId: partner._id,
          partnerName: partner.name,
          partnerEmail: partner.email,
          requestedBy: userEmail,
          requestedAt: new Date(),
        }),
      });
      if (!resRequest.ok) throw new Error("Failed to save request");

      toast.success("Partner request sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-base-200 flex justify-center py-12">
      <div className="w-full max-w-5xl bg-base-100 rounded-xl shadow-lg p-8 md:p-12">
        {/* Top Row: Profile Image + Name + Rating */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={partner.profileimage}
            alt={partner.name}
            className="w-40 h-40 rounded-full border-4 border-primary object-cover shadow-md"
          />

          <div className="flex-1 flex flex-col">
            <h1 className="text-4xl font-bold text-base-content">{partner.name}</h1>
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

        {/* Profile Details as List */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-base-content">
            Profile Details
          </h2>
          <ul className="flex flex-col gap-3 text-base-content text-lg">
            <li>
              <span className="font-semibold">Subject:</span> {partner.subject}
            </li>
            <li>
              <span className="font-semibold">Study Mode:</span> {partner.studyMode}
            </li>
            <li>
              <span className="font-semibold">Availability:</span> {partner.availabilityTime}
            </li>
            <li>
              <span className="font-semibold">Location:</span> {partner.location}
            </li>
            <li>
              <span className="font-semibold">Experience Level:</span> {partner.experienceLevel}
            </li>
            <li>
              <span className="font-semibold">Partner Count:</span> {partnerCount}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {partner.email}
            </li>
          </ul>
        </div>

        {/* Send Partner Request Button */}
        <div className="mt-10 flex justify-center md:justify-start">
          <button
            onClick={handleSendRequest}
            disabled={loading}
            className="btn btn-primary rounded-full px-10 py-4 text-lg shadow-md hover:shadow-lg transition"
          >
            {loading ? "Sending..." : "Send Partner Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
