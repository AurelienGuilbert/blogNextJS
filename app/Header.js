import Link from "next/link";
import React from "react";

import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data } = useSession();

  return (
    <nav className="navbar navbar-light bg-light row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0 d-flex">
          <Link className="nav-link mx-2" href="/">
            Blog
          </Link>
          <Link className="nav-link mx-2" href="/dashboard">
            | Dashboard Admin
          </Link>
        </div>

        <div className=" mt-3 mt-md-0 text-center d-flex flex-row align-items-center justify-content-end me-3">
          {data?.user ? (
            <>
              <Link className="nav-link me-2" href="/article">
                Post an article
              </Link>
              <div>|</div>
              <span className="mx-2">Hi, {data?.user?.name}</span>

              <span style={{ cursor: "pointer" }} onClick={() => signOut()}>
                <button className="btn btn-secondary">logout</button>
              </span>
            </>
          ) : (
            <span>
              <Link className="" href="/login">
                <button className="btn btn-primary">login</button>
              </Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
