import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CiHome, CiMusicNote1, CiLogout } from "react-icons/ci";
import { IoSearch, IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { FiltertCard } from "./index";
import "../css/SideBar.css";
import { getAllSongs } from "../api";
import { setAllSongs } from "../context/action";

const SideBar = () => {
  const [slideMode, setSlideMode] = useState(
    localStorage.getItem("slideMode") === "true" ? true : false
  );
  const [goPrime, setGoPrime] = useState(
    window.localStorage.getItem("go-prime") === "true" ? true : false
  );
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  const [filterSong, setFilterSong] = useState("");
  const [filterList, setFilterList] = useState();


  const navigate = useNavigate();

  const body = document.querySelector("body");
  const userData = useSelector((state) => state.userData);
  const songs = useSelector((state) => state.allSongs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dark) {
      localStorage.setItem("darkMode", "true");
      body.classList.add("dark");
    } else {
      localStorage.setItem("darkMode", "false");
      body.classList.remove("dark");
    }
  }, [dark, body.classList]);

  useEffect(() => {
    if (slideMode) {
      localStorage.setItem("slideMode", "true");
    } else {
      localStorage.setItem("slideMode", "false");
    }
  }, [slideMode]);

  useEffect(() => {
    if (!songs) {
      getAllSongs().then((data) => dispatch(setAllSongs(data)));
    }
  }, []);

  return (
    <>
      {filterSong != "" && (
        <div className={`filter-song ${slideMode && "filter-close"}`}>
          {filterList?.map((item) => (
            <FiltertCard data={item} />
          ))}
        </div>
      )}
      <nav className={`sidebar ${slideMode && "close"}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>
            <div className="text header-text">
              <span className="name">
                SonicSpot {goPrime && <FaStar className="icon" color="gold" />}
              </span>
              <span className="userName">
                id:{" "}
                {`${
                  userData?._id < 15
                    ? userData?._id
                    : userData?._id.slice(0, 14) + "..."
                }`}
              </span>
            </div>
          </div>

          <i className="toggle" onClick={() => setSlideMode(!slideMode)}>
            <IoIosArrowForward />
          </i>
        </header>

        {/* menu-bar  */}
        <div className="menu-bar">
          <div className="menu">
            <li className="search-box" onClick={() => setSlideMode(false)}>
              <IoSearch className="icon" />
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  setFilterSong(e.target.value);
                  setFilterList(
                    songs?.filter((item) =>
                      item.name.toLowerCase().includes(filterSong.toLowerCase())
                    )
                  );
                }}
              />
            </li>
            <ul className="menu-links">
              <li className="nav-link">
                <a onClick={() => navigate("/home")}>
                  <CiHome className="icon" />
                  <span className="text nav-text">Home</span>
                </a>
              </li>

              <li className="nav-link">
                <a onClick={() => navigate("/music")}>
                  <CiMusicNote1 className="icon" />
                  <span className="text nav-text">Music</span>
                </a>
              </li>

              <li className="nav-link">
                <a
                  onClick={() => {
                    window.localStorage.setItem("go-prime", "true");
                    navigate("/home");
                  }}
                >
                  <FaStar className="icon" color="gold" />
                  <span className="text nav-text">Go Prime</span>
                </a>
              </li>

              <li className="nav-link">
                <a onClick={() => navigate("/home")}>
                  <MdOutlineRateReview className="icon" />
                  <span className="text nav-text">Reviews</span>
                </a>
              </li>

              {userData?.role === "admin" && (
                <li className="nav-link">
                  <a onClick={() => navigate("/dashboard")}>
                    <RiAdminLine className="icon" />
                    <span className="text nav-text">Dashboard</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="bttom-content">
            <li className="nav-link">
              <a
                onClick={() => {
                  window.localStorage.setItem("auth","false");
                  }
                }
              >
                <CiLogout className="icon" />
                <span className="text nav-text">Log Out</span>
              </a>
            </li>

            <li className="mode">
              <div className="moon-sun">
                {dark ? (
                  <IoSunnyOutline className="icon" />
                ) : (
                  <IoMoonOutline className="icon" />
                )}
              </div>
              <span className="mode-text text">
                {dark ? "Light Mode" : "Dark Mode"}
              </span>

              <div className="toggle-switch" onClick={() => setDark(!dark)}>
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      <section className="home">
        {slideMode && <div className="text">SonicSpot</div>}
      </section>
    </>
  );
};

export default SideBar;
