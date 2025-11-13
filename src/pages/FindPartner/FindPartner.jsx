import React, { useState, useEffect, useRef } from "react";
import PartnerCard from "./PartnerCard";
import Sort from "./Sort";
import Search from "./Search";
import Loading from "../../components/Loading";

const FindPartner = () => {
  const [partners, setPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    // Debounce: wait 500ms after last input change
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchPartners(searchQuery, sortBy);
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [searchQuery, sortBy]);

  const fetchPartners = async (query = "", sortField = "") => {
    // Cancel any previous ongoing fetch
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    try {
      let url = "http://localhost:3000/partners";
      if (query) url = `http://localhost:3000/partners/search?name=${query}`;
      else if (sortField)
        url = `http://localhost:3000/partners/sort?sort=${sortField}&order=desc`;

      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error("Failed to fetch partners");

      let data = await res.json();
      if (query && sortField) data = sortData(data, sortField);
      setPartners(data);
    } catch (err) {
      if (err.name !== "AbortError") console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => setSearchQuery(query);
  const handleSort = (value) => setSortBy(value);

  const sortData = (data, field) => {
    const sorted = [...data].sort((a, b) => {
      if (field === "rating") return b.rating - a.rating;
      if (field === "experienceLevel") {
        const levels = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        return (levels[b.experienceLevel] || 0) - (levels[a.experienceLevel] || 0);
      }
      if (field === "patnerCount") return b.patnerCount - a.patnerCount;
      return 0;
    });
    return sorted;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <div className="order-2 md:order-1">
          <Sort onSortChange={handleSort} />
        </div>
        <div className="order-1 md:order-2 w-full md:w-auto">
          <Search onSearch={handleSearch} />
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
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
