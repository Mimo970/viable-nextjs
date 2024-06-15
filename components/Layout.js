import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] ">
      <Navbar />
      <main className="flex-1  flex justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
