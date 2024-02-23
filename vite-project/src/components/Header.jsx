import React, { useContext, useState } from "react";
import Searchpost from "./Searchpost";
import { Link } from "react-router-dom";
import { crudStore } from "../store/Store";

const Header = () => {


  const [getInput, setInput] = useState("")

  const {onSearchPosts, displayingHeader, displayHeader, displayMain} = useContext(crudStore)

    return (
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>
  
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="#" className="nav-link px-2 text-secondary">
                  {displayHeader === "feature" && "Home"}
                </a>
              </li>
              {displayHeader === "feature" && <li onClick={() => displayingHeader("home")}>
                <Link to="/" className="nav-link px-2 text-warning" >
                  Go back to Dashboard
                </Link>
              </li>}
              {displayMain === "home" && displayHeader !== "feature" && <li onClick={() => displayingHeader("feature")}>
                <Link to="/featurepost" className="nav-link px-2 text-warning" >
                  Feature post
                </Link>
              </li>}
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  {displayHeader === "feature" && "Pricing"}
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  {displayHeader === "feature" && "FAQs"}
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  {displayHeader === "feature" && "About"}
                </a>
              </li>
            </ul>
            <Searchpost displayHeader={displayHeader}>
            <form
                className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                role="search"
                style={{display: "flex", gap: "20px"}}
              >
                <input
                  type="text"
                  className=" text-bg-warning"
                  placeholder="Type your favorite post"
                  aria-label="Search"
                  value={getInput}
                  onChange={(e) => {
                    setInput(e.target.value);
                    onSearchPosts(getInput);
                  }}
                />
                <div className="text-end">
                <button type="button" className="btn btn-outline-light me-2" onClick={() => {
                  setInput("");
                  onSearchPosts("");
                }}>
                  Clear
                </button>
                </div>
              </form>
            </Searchpost>
            <div className="text-end">
              <button type="button" className="btn btn-warning">
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>
    );
};

export default Header;
