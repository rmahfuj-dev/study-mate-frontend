import React from "react";

const Sort = ({ onSortChange }) => {
  const handleChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        className="select select-bordered select-sm w-full max-w-xs"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="">Select</option>
        <option value="rating">Rating</option>
        <option value="experienceLevel">Experience</option>
        <option value="patnerCount">Partner Count</option>
      </select>
    </div>
  );
};

export default Sort;
