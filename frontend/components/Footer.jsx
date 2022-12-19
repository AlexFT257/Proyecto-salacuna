import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="footerContainer fixed bottom-0 left-0 w-full flex flex-row  content-center justify-center">
      <div className="footerItem m-2">
        <Link href="/about" className=" ">
          About
        </Link>
      </div>
      <div className="footerItem m-2">
        <Link href="/contact" className=" ">
          Contact us
        </Link>
      </div>
    </div>
  );
};
export default Footer;
