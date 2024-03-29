import React from "react";
import {
  FaUserFriends,
  FaNewspaper,
  FaShoppingBag,
  FaUser,
  FaFacebookMessenger,
  FaCalendar,
} from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineSegment } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import myImage from "../SS.jpg";
import { IoSettings } from "react-icons/io5";


const HeaderforUser = () => {
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
                <img src={myImage} alt="Hello" className="button-logo" style={{marginBottom:"1rem"}} />
              </a>
          </Link>
        </div>
        <div>
          <Link to="/adminoptions">
              <a href="#" className="brand-icons">
              <FaCalendar />
              </a>
          </Link>
        </div>
        <div>
          <Link to="/adminoptions">
              <a href="#" className="brand-icons">
              <FaRegMessage />
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
    </header>
  );
};

export default HeaderforUser;
