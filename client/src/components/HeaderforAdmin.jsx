import React from "react";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
// import "../styles/Header.css";
import myImage from "../SS.jpg";

const HeaderforAdmin = () => {
  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "1rem",
          paddingRight: "0.5rem",
          paddingLeft: "0.5rem",
        }}
      >
        <div>
          <Link to="/admin">
              <a href="#" className="brand-icons">
                <img src={myImage} alt="Hello" className="button-logo" />
              </a>
          </Link>
        </div>
        <div>
          <Link to="/adminoptions">
              <a href="#" className="brand-icons">
                <IoSettings />
              </a>
          </Link>
        </div>
      </div>
      {/* <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "1rem",
            paddingRight: "0.5rem",
            paddingLeft: "0.5rem",
          }}
        >
          <Link to="/">
            <li>
              <a href="#" className="brand-icons">
                <img src={myImage} alt="Hello" className="button-logo" />
              </a>
            </li>
          </Link>
          <Link to="/options">
            <li>
              <a href="#" className="brand-icons">
                <IoSettings />
              </a>
            </li>
          </Link>
        </ul>
      </nav> */}
    </header>
  );
};

export default HeaderforAdmin;
