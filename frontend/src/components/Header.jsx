import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="text-light shadow bg-primary border border-primary m-2 d-flex justify-content-center align-items-center text-center py-3">
      <h1 className={isHome ? "text-center" : "me-auto ms-4"}>
        Movie search application
      </h1>
      {!isHome && (
        <button className="btn btn-primary me-4">
          <Link className="linkstyle" to="/">
            Home
          </Link>
        </button>
      )}
    </header>
  );
}

export default Header;
