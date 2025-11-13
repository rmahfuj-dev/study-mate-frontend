import React from "react";
import Container from "../../components/Container";
import error from "/error.png";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div>
      <Container className="flex justify-center items-center h-screen flex-col gap-0">
        <img className="w-full max-w-[400px]" src={error} alt="" />
        <h1 className="text-4xl font-extrabold">Page Not Found !</h1>
        <Link
          className="bg-accent text-xl font-bold px-4 py-2 rounded-md mt-4"
          to="/"
        >
          Go Back To Home
        </Link>
      </Container>
    </div>
  );
};

export default NotFound;
