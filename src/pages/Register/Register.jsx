import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Container from "../../components/Container";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router";

const Register = () => {
  const { googleSignIn, createUserWithEmailPass, updateData, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleRegister = (userdata) => {
    const { email, name, password, profile } = userdata;

    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must be at least 6 characters with uppercase and lowercase letters"
      );
      return;
    }

    createUserWithEmailPass(email, password)
      .then(() => {
        updateData({ displayName: name, photoURL: profile || "" })
          .then(() => {
            fetch("https://studymate-indol.vercel.app/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email }),
            })
              .then((res) => res.json())
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Account Created!",
                  text: "Your account has been successfully registered.",
                });
                reset();
                navigate(from, { replace: true });
              })
              .catch((err) => toast.error(err.message));
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };

  const googleLogin = () => {
    googleSignIn()
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const name = displayName || "";
        const profile = photoURL || "";

        updateData({ displayName: name, photoURL: profile })
          .then(() => {
            fetch("https://studymate-indol.vercel.app/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email }),
            })
              .then((res) => res.json())
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Google Registration Successful!",
                  text: "You have been registered with Google.",
                });
                navigate(from, { replace: true });
              })
              .catch((err) => toast.error(err.message));
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };
  if (user) {
    navigate("/");
  }
  return (
    <div>
      <Container className="flex w-full h-screen justify-center items-center flex-col gap-8">
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-lg font-semibold">
              Register
            </legend>

            <label className="label">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input"
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}

            <label className="label">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailPattern,
                  message: "Invalid email format",
                },
              })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}

            <label className="label">Photo URL</label>
            <input
              {...register("profile")}
              type="text"
              className="input"
              placeholder="Profile Link (optional)"
            />

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

            <input
              type="submit"
              value="Register"
              className="btn btn-neutral mt-4"
            />
            <p className="text-sm mt-2 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
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
            Register with Google
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Register;
