import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center px-4 py-8 sm:py-10"
    >
      <div className="flex flex-col sm:flex-row w-full max-w-lg bg-base-200 shadow-md border border-base-300 rounded-2xl sm:rounded-full p-3 sm:p-2 gap-2 sm:gap-0 focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
        <div className="flex items-center flex-1 bg-base-200 px-3 sm:px-5 py-2 sm:py-3 rounded-full">
          <FaSearch className="text-gray-400 text-lg mr-2 sm:mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search partner by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none flex-1 text-base text-gray-700 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-sm w-full sm:w-auto rounded-full"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
