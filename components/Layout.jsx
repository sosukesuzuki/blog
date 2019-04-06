import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Link href="/">
          <a>
            <h1>鈴木颯介のブログ</h1>
          </a>
        </Link>
      </header>
      {children}
    </>
  );
};

export default Layout;
