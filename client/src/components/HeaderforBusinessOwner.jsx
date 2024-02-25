import React from "react";
import {
  FaUserFriends,
  FaNewspaper,
  FaShoppingBag,
  FaUser,
  FaFacebookMessenger,
  FaCalendar,
  FaPlus,
   FaListUl 
} from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineSegment } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import myImage from "../SS.jpg";
import { IoSettings } from "react-icons/io5";

const HeaderforBusinessOwner = () => {
  return (
    <div>
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
          <Link to="/restaurent">
              <a href="#" className="brand-icons">
                <img src={myImage} alt="Hello" className="button-logo" style={{marginBottom:"1rem"}} />
              </a>
          </Link>
        </div>
        <div>
          <Link to="/restaurentadditem">
              <a href="#" className="brand-icons">
              <FaPlus />
              </a>
          </Link>
        </div>
        <div>
          <Link to="/restaurentinventory">
              <a href="#" className="brand-icons">
              <FaListUl />
              </a>
          </Link>
        </div>
        <div>
          <Link to="/restaurentoptions">
              <a href="#" className="brand-icons">
                <IoSettings />
              </a>
          </Link>
        </div>
      </div>
    </header>
    </div>
  )
}

export default HeaderforBusinessOwner
