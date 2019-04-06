import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Link href="/">
          <h1>鈴木颯介のブログ</h1>
        </Link>
      </header>
      {children}
    </>
  );
};

export default Layout;
