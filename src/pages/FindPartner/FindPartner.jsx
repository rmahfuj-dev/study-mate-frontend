import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PartnerCard from "./PartnerCard";
import Sort from "./Sort";
import Search from "./Search";
import Loading from "../../components/Loading";
import Container from "../../components/Container";

const FindPartner = () => {
  const [partners, setPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);

  const cancelTokenRef = useRef(null);
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
    // Cancel previous request
    if (cancelTokenRef.current) cancelTokenRef.current.cancel();

    cancelTokenRef.current = axios.CancelToken.source();

    setLoading(true);
    try {
      let url = "https://studymate-indol.vercel.app/partners";
      if (query)
        url = `https://studymate-indol.vercel.app/partners/search?name=${query}`;
      else if (sortField)
        url = `https://studymate-indol.vercel.app/partners/sort?sort=${sortField}&order=desc`;

      const response = await axios.get(url, {
        cancelToken: cancelTokenRef.current.token,
      });

      let data = response.data;
      if (query && sortField) data = sortData(data, sortField);

      setPartners(data);
    } catch (err) {
      if (!axios.isCancel(err)) console.error(err);
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
        return (
          (levels[b.experienceLevel] || 0) - (levels[a.experienceLevel] || 0)
        );
      }
      if (field === "partnerCount") return b.partnerCount - a.partnerCount;
      return 0;
    });
    return sorted;
  };

  return (
    <Container className="container mx-auto px-4 py-10">
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
    </Container>
  );
};

export default FindPartner;
