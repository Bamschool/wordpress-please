import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm">
      <span className="dark:text-gay-100 text-gray-900 fond-bold text-lg mr-2">
        NiceToMeetYouKorean
      </span>
      &copy; {new Date().getFullYear()} All rights Reversed
    </footer>
  );
};
export default Footer;
