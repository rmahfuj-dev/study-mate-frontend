import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim()); // call parent only on submit
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center py-10">
      <div className="flex items-center bg-base-200 shadow-md border border-base-300 rounded-full px-5 py-3 w-full max-w-lg focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
        <FaSearch className="text-gray-400 text-lg mr-3" />
        <input
          type="text"
          placeholder="Search partner by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none flex-1 text-base text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="ml-2 btn btn-primary btn-sm rounded-full"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
