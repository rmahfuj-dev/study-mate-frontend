import React, { useState, useEffect } from "react";
import PartnerCard from "./PartnerCard";
import Sort from "./Sort";
import Search from "./Search";
import Loading from "../../components/Loading";

const FindPartner = () => {
  const [partners, setPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllPartners = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/partners");
        const data = await res.json();
        setPartners(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPartners();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchPartners(searchQuery, sortBy);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, sortBy]);

  const fetchPartners = async (query = "", sortField = "") => {
    setLoading(true);
    try {
      let url = "";
      if (query) {
        url = `http://localhost:3000/partners/search?name=${query}`;
      } else if (sortField) {
        url = `http://localhost:3000/partners/sort?sort=${sortField}&order=desc`;
      } else {
        url = "http://localhost:3000/partners";
      }

      const res = await fetch(url);
      let data = await res.json();

      if (query && sortField) {
        data = sortData(data, sortField);
      }

      setPartners(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const sortData = (data, field) => {
    const sorted = [...data].sort((a, b) => {
      if (field === "rating") return b.rating - a.rating;
      if (field === "experienceLevel") {
        const levels = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        return (
          (levels[b.experienceLevel] || 0) - (levels[a.experienceLevel] || 0)
        );
      }
      if (field === "patnerCount") return b.patnerCount - a.patnerCount;
      return 0;
    });
    return sorted;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <div className="order-2 md:order-1">
          <Sort onSortChange={handleSort} />
        </div>
        <div className="order-1 md:order-2 w-full md:w-auto">
          <Search onSearch={handleSearch} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loading />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {partners.length ? (
            partners.map((partner) => (
              <PartnerCard key={partner._id} partner={partner} />
            ))
          ) : (
            <p className="text-center col-span-full">No partners found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FindPartner;
