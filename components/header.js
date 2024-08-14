// components/Header.js
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed-top border-bottom-1 headerContainer">
      <nav className="navbar navbar-expand-lg navbar-light container px-2">
        <Link className="navbar-brand" href="/">
          <h2 className="logoTitle">Dashboard</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" href="/email-editor">
                <div className="createButton mx-lg-0 mx-5 my-lg-0 my-3">
                  <button
                    className="btn text-nowrap text-light"
                  >
                    <i className="fa fa-plus"></i> &nbsp;&nbsp;Create New
                    Template
                  </button>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
