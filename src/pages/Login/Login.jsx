import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Container from "../../components/Container";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";

const Login = () => {
  const { googleSignIn, signInEmailPass } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (userdata) => {
    const { email, password } = userdata;
    signInEmailPass(email, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };

  const googleLogin = () => {
    googleSignIn()
      .then((res) => {
        const { displayName: name, email } = res.user;
        const userData = { name, email };
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div>
      <Container className="flex w-full h-screen justify-center items-center flex-col gap-8">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}

            <label className="label">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}

            <Link to="/forget-password" className="text-sm text-right mt-2 text-blue-600 cursor-pointer">
              Forget Password?
            </Link>

            <input
              type="submit"
              value="Login"
              className="btn btn-neutral mt-4"
            />
            <Link to="/register" className="text-center text-sm ">Don't have an account?<span className="text-blue-600">Register</span></Link>
          </fieldset>
        </form>

        <div className="flex justify-center items-center flex-col gap-4">
          <p>Or</p>
          <button
            onClick={googleLogin}
            className="btn bg-white text-black border-[#e5e5e5] flex items-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Login;
