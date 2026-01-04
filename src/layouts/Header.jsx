import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../components/ThemeToggle";
import Logo from "../../public/Logo";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
      {!user ? null : (
        <>
          <li>
            <NavLink
              to="/create-partner"
              className={({ isActive }) =>
                isActive ? "font-bold text-primary" : undefined
              }
              onClick={() => setIsOpen(false)}
            >
              Create Partner Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-connections"
              className={({ isActive }) =>
                isActive ? "font-bold text-primary" : undefined
              }
              onClick={() => setIsOpen(false)}
            >
              My Connections
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="shadow-xl bg-base-300 sticky top-0 z-10 left-0 w-full">
      <div className="navbar px-4 justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-12 sm:w-16 text-current" />
            <h1 className="text-xl sm:text-3xl font-semibold font-display">
              StudyMate
            </h1>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <div className="relative">
              <img
                src={
                  user.photoURL ||
                  "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={() => setProfileOpen(!profileOpen)}
              />
              {profileOpen && (
                <ul className="absolute right-0 mt-2 w-40 p-2 shadow-lg rounded-lg bg-base-100 flex flex-col gap-2 z-50">
                  <li>
                    <NavLink
                      to="/profile"
                      className="hover:bg-base-200 px-2 py-1 rounded"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="btn btn-sm btn-error text-white w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
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
            ) : null}
            <ThemeToggle />
          </div>

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
                {!user && (
                  <>
                    <li>
                      <NavLink to="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" onClick={() => setIsOpen(false)}>
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
                {user && (
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="btn btn-sm btn-error text-white w-full"
                    >
                      Logout
                    </button>
                  </li>
                )}
                <li className="flex justify-center mt-2">
                  <ThemeToggle />
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
