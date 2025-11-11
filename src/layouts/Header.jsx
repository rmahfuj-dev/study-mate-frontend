import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../components/ThemeToggle";
import Logo from "../../public/Logo";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Logout error:", error));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : undefined
          }
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/find-partner"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : undefined
          }
          onClick={() => setIsOpen(false)}
        >
          Find Partner
        </NavLink>
      </li>

      {/* Mobile Auth Buttons */}
      {!user ? (
        <>
          <li className="md:hidden">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "font-bold text-primary" : undefined
              }
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          </li>
          <li className="md:hidden">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "font-bold text-primary" : undefined
              }
              onClick={() => setIsOpen(false)}
            >
              Register
            </NavLink>
          </li>
        </>
      ) : (
        <li className="md:hidden">
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="btn btn-sm btn-error text-white"
          >
            Logout
          </button>
        </li>
      )}

      <li>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </li>
    </>
  );

  return (
    <header className="shadow-sm bg-base-200">
      <div className="navbar px-4 justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-12 sm:w-16 text-current" />
            <h1 className="text-xl sm:text-3xl font-semibold font-display">
              StudyMate
            </h1>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Desktop Auth Buttons + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {!user ? (
              <div className="space-x-2">
                <NavLink to="/login" className="btn">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn">
                  Register
                </NavLink>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-error text-white"
              >
                Logout
              </button>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="relative lg:hidden">
            <button
              className="btn btn-ghost"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {isOpen && (
              <ul className="absolute right-0 mt-2 w-52 p-2 shadow-lg rounded-lg bg-base-100 flex flex-col gap-2 z-50">
                {links}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
