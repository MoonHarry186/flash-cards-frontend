import React from "react";
import Header from "./Header";
import Footer from "./Footer";


const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto lg:px-0 md:p-4 md:py-8">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
