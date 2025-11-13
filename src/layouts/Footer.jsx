import {  FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import Logo from "../../public/Logo"; // replace with your logo path if needed
import {  FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer bg-base-300 text-base-content p-10 rounded-t-lg">
      <div className="w-full flex flex-col lg:flex-row justify-evenly items-center lg:items-start gap-6">
        <div className="flex flex-col items-center lg:items-start gap-2">
          <div className="flex items-center gap-2">
            <Logo className="w-12 sm:w-16" />
            <h1 className="text-xl sm:text-3xl font-semibold font-display">StudyMate</h1>
          </div>
          <p className="text-center lg:text-left max-w-xs">
            StudyMate is a modern platform to help students find and connect with study partners easily.
          </p>
          <div className="flex gap-4 mt-2 text-2xl">
            <a href="#" aria-label="Twitter" className="hover:text-primary"><FaSquareXTwitter /></a>
            <a href="#" aria-label="YouTube" className="hover:text-primary"><FaYoutube /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary"><FaLinkedin /></a>
            <a href="#" aria-label="Instagram" className="hover:text-primary"><FaInstagram /></a>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <nav className="grid grid-flow-col gap-4 mb-4">
            <a className="link link-hover" href="#">About us</a>
            <a className="link link-hover" href="#">Contact</a>
            <a className="link link-hover" href="#">Jobs</a>
            <a className="link link-hover" href="#">Press kit</a>
          </nav>
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} - All rights reserved by StudyMate
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
