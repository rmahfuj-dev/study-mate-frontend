import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { div } from "framer-motion/client";
import ConnectCard from "./ConnectCard";
import Container from "../../components/Container";

const MyConnections = () => {
  const { user } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all connections for the logged-in user
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/my-connects?userEmail=${user.email}`
        );
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.error || "Failed to fetch connections");

        setConnections(data || []);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Container className='grid grid-cols-1 place-items-center gap-4 py-16'>
        {connections.map((connection) => {
          return <ConnectCard key={connection._id} {...connection} />;
        })}
      </Container>
    </div>
  );
};

export default MyConnections;
