import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const ConnectCard = ({
  profileimage,
  subject,
  studyMode,
  email,
  connections,
  setConnections,
}) => {
  const { user } = useContext(AuthContext);
  const userEmail = user.email;

  const [visible, setVisible] = useState(true);
  const [partnerName, setPartnerName] = useState("");

  useEffect(() => {
    const fetchPartnerName = async () => {
      try {
        const res = await fetch(`http://localhost:3000/connect/${email}`);
        if (!res.ok) throw new Error("Failed to fetch partner name");
        const data = await res.json();
        setPartnerName(data.partnerName);
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "Could not fetch partner name",
          icon: "error",
        });
      }
    };

    fetchPartnerName();
  }, [email]);

  const handleDelete = async () => {
    const confirmResult = await Swal.fire({
      title: `Remove ${partnerName}?`,
      text: "This connection will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:3000/connects/delete?userEmail=${userEmail}&partnerEmail=${email}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (res.ok) {
        setVisible(false);
        Swal.fire({
          title: "Deleted!",
          text: "Connection has been removed.",
          icon: "success",
        });
        setConnections((prev) => prev.filter((conn) => conn.email !== email));
      } else {
        Swal.fire({
          title: "Error",
          text: data.error || "Failed to delete connection",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Error deleting connection:", err);
      Swal.fire({
        title: "Error",
        text: "Server error occurred",
        icon: "error",
      });
    }
  };

  const handleUpdate = async () => {
    const { value: newName } = await Swal.fire({
      title: "Update Partner Name",
      input: "text",
      inputLabel: "Partner Name",
      inputValue: partnerName,
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!newName) return;

    try {
      const updateRes = await fetch(`http://localhost:3000/connects/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          partnerEmail: email,
          partnerName: newName,
        }),
      });

      const updateData = await updateRes.json();

      if (updateRes.ok) {
        setPartnerName(newName);
        Swal.fire({
          title: "Updated!",
          text: "Partner name updated successfully.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: updateData.error || "Failed to update partner name",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Error updating partner:", err);
      Swal.fire({
        title: "Error",
        text: "Server error occurred",
        icon: "error",
      });
    }
  };

  if (!visible) return null;

  return (
    <div className="bg-base-100 shadow-md rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 border border-base-300 w-full">
      <img
        src={profileimage}
        alt={partnerName}
        className="w-20 h-20 rounded-full object-cover"
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-base-content">
          {partnerName}
        </h2>
        <p className="text-sm text-base-content/70">
          <strong>Subject:</strong> {subject}
        </p>
        <p className="text-sm text-base-content/70">
          <strong>Study Mode:</strong> {studyMode}
        </p>
        <p>The Email is : {email}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={handleUpdate} className="btn btn-primary">
          Update
        </button>
        <button onClick={handleDelete} className="btn btn-error">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConnectCard;
