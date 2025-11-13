import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopStudyPartners = () => {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(
          "https://studymate-indol.vercel.app/partners/sort?sort=rating&order=desc"
        );
        const data = await res.json();
        setPartners(data.slice(0, 3)); // top 3 partners
      } catch (err) {
        console.error("Failed to fetch partners:", err);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-primary">
          Top Study Partners
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <figure className="px-6 pt-6">
                <img
                  src={
                    partner.profileimage ||
                    "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png"
                  }
                  alt={partner.name}
                  className="rounded-full w-32 h-32 object-cover mx-auto"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{partner.name}</h3>
                <p className="text-gray-500">{partner.subjects?.join(", ")}</p>
                <div className="flex mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`inline-block text-yellow-400 ${
                        i < Math.round(partner.rating)
                          ? "fas fa-star"
                          : "far fa-star"
                      }`}
                    ></span>
                  ))}
                </div>
                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => navigate(`/partner/${partner._id}`)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopStudyPartners;
