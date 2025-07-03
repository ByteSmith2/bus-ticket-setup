// src/components/navbar/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { LiaTimesSolid } from "react-icons/lia";
import { FaBars } from "react-icons/fa6";
import Theme from "../theme/Theme";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("role") === "Admin");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    setIsAdmin(role === "Admin");
  }, [user]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Book Ticket" },
    ...(isAuthenticated
      ? [
          { href: "/cancel-booking", label: "Cancel Booking" },
          { href: "/ticket-display", label: "Ticket Display" },
        ]
      : []),
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []), // Chỉ hiện Admin nếu là Admin
    ...(!isAdmin && isAuthenticated ? [{ href: "/employee", label: "Employee" }] : []), // Chỉ hiện Employee nếu là Employee
  ];

  const handleClick = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full h-[8ch] bg-neutral-100 dark:bg-neutral-900 flex items-center md:flex-row lg:px-28 md:px-16 sm:px-7 px-4 fixed top-0 z-50 shadow-md">
      <Link to="/" className="mr-16" aria-label="Go to homepage">
        <img
          src={Logo}
          alt="Bus Ticket Reservation Logo"
          className="w-28 h-auto object-contain"
          onError={(e) => (e.target.src = "/path/to/fallback-logo.png")}
        />
      </Link>

      <button
        onClick={handleClick}
        className="flex-1 lg:hidden text-neutral-600 dark:text-neutral-300 ease-in-out duration-300 flex items-center justify-end"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <LiaTimesSolid className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      <div
        className={`${
          open ? "flex absolute top-14 left-0 w-full h-screen" : "hidden"
        } flex-1 md:flex flex-col md:flex-row gap-x-5 gap-y-2 md:items-center md:p-0 sm:p-4 p-4 justify-between md:bg-transparent bg-neutral-100 md:shadow-none shadow-lg rounded-md`}
      >
        <ul className="list-none flex md:items-center items-start gap-x-5 gap-y-1 flex-wrap md:flex-row flex-col text-base text-neutral-600 dark:text-neutral-400 font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                onClick={handleClose}
                className="hover:text-violet-600 ease-in-out duration-300"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex md:items-center items-start gap-x-5 gap-y-2 flex-wrap md:flex-row flex-col text-base font-medium text-neutral-800">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-700 dark:text-neutral-300 font-semibold">
                Hi, {user?.username || localStorage.getItem("username") || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition-all duration-200"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 lg:mt-0 items-center justify-center w-full h-full">
              <Link
                to="/register"
                className="bg-white text-purple-600 px-6 py-2 rounded shadow hover:bg-gray-100 text-center font-semibold transition-all duration-200"
                onClick={handleClose}
                aria-label="Navigate to register"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-white text-purple-600 px-6 py-2 rounded shadow hover:bg-gray-100 text-center font-semibold transition-all duration-200"
                onClick={handleClose}
                aria-label="Navigate to login"
              >
                Login
              </Link>
            </div>
          )}
          <Theme />
        </div>
      </div>
    </div>
  );
};

export default Navbar;