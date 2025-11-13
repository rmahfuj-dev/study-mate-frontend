import React from "react";

const ConnectCard = ({ name, profileimage, subject, studyMode }) => {
  return (
    <div className="bg-base-100 shadow-md rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 border border-base-300 w-full">
      
      {/* Profile Picture */}
      <img
        src={profileimage}
        alt={name}
        className="w-20 h-20 rounded-full object-cover"
      />

      {/* Details */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-base-content">{name}</h2>
        <p className="text-sm text-base-content/70"><strong>Subject:</strong> {subject}</p>
        <p className="text-sm text-base-content/70"><strong>Study Mode:</strong> {studyMode}</p>
      </div>

      {/* Buttons (static, no functionality yet) */}
      <div className="flex gap-2">
        <button className="btn btn-primary">Update</button>
        <button className="btn btn-error">Delete</button>
      </div>
    </div>
  );
};

export default ConnectCard;
