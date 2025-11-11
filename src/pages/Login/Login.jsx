import React, { useContext } from "react";
import Container from "../../components/Container";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const Login = () => {
  return (
    <div>
      <Container className="flex w-full h-screen justify-center items-center">
        <form action="">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />

            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />

            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
      </Container>
    </div>
  );
};

export default Login;
