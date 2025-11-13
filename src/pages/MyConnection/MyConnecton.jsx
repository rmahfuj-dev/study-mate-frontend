import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { div } from "framer-motion/client";
import ConnectCard from "./ConnectCard";
import Container from "../../components/Container";
import { Link } from "react-router";

const MyConnections = () => {
  const { user } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  console.log(connections);
  const [loading, setLoading] = useState(true);
  console.log(connections);
  // Fetch all connections for the logged-in user
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://studymate-indol.vercel.app/my-connects?userEmail=${user.email}`
        );
        const data = await res.json();

        if (!res.ok)
          throw new Error(
            data.error || "You don't have any connects right now"
          );

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
  if (connections.length == 0) {
    return (
      <div className="flex w-full h-screen justify-center items-center flex-col gap-4">
        <p className="text-2xl font-semibold text-center">
          You Don't have any connection right now
        </p>
        <Link className="bg-primary btn text-white" to="/find-partner">
          Add StudyPartner
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Container className="grid grid-cols-1 place-items-center gap-4 py-16">
        {connections.map((connection) => {
          return (
            <ConnectCard
              key={connection._id}
              {...connection}
              connections={connections}
              setConnections={setConnections}
            />
          );
        })}
      </Container>
    </div>
  );
};

export default MyConnections;
