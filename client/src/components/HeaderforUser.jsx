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

const HeaderforUser = () => {
  return (
    <header>
      <nav>
        <ul>
          <Link to="/">
            <li>
              <a href="#" className="brand-icons">
                <img src={myImage} alt="Hello" className="button-logo" />
              </a>
            </li>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/shifts">
            <li>
              <a href="#" className="brand-icons">
                <FaCalendar />
              </a>
            </li>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/announcements">
            <li>
              <a href="#" className="brand-icons">
                <FaRegMessage />
              </a>
            </li>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/options">
            <li>
              <a href="#" className="brand-icons">
                <MdOutlineSegment />
              </a>
            </li>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ul>
      </nav>
    </header>
  );
};

export default HeaderforUser;
