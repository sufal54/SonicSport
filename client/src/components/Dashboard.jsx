import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdOutlineMusicVideo } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoIosAlbums } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from "../api";
import {
  setAllAlbums,
  setAllArtists,
  setAllSongs,
  setAllUsers,
} from "../context/action";
import "../css/Dashboard.css";

const Dashboard = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!state.allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUsers(data));
      });
    }
    if (!state.allSongs) {
      getAllSongs().then((data) => {
        dispatch(setAllSongs(data));
      });
    }
    if (!state.allArtist) {
      getAllArtists().then((data) => {
        dispatch(setAllArtists(data));
      });
    }
    if (!state.allAlbum) {
      getAllAlbums().then((data) => {
        dispatch(setAllAlbums(data));
      });
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="information">
        <a onClick={() => navigate("/dashboard/admin-allusers")}>
          <div className="details-cards">
            <FaUsers className="icon" />
            <p>Total Users</p>
            <p>{state.allUsers?.length}</p>
          </div>
        </a>
        <a onClick={() => navigate("/dashboard/admin-allsongs")}>
          <div className="details-cards">
            <MdOutlineMusicVideo className="icon" />
            <p>Total Songs</p>
            <p>{state.allSongs?.length}</p>
          </div>
        </a>
        <a onClick={() => navigate("/dashboard/admin-allartists")}>
          <div className="details-cards">
            <IoPerson className="icon" />
            <p>Total Artists</p>
            <p>{state.allArtist?.length}</p>
          </div>
        </a>
        <a onClick={() => navigate("/dashboard/admin-allalbums")}>
          <div className="details-cards">
            <IoIosAlbums className="icon" />
            <p>Total Albums</p>
            <p>{state.allAlbum?.length}</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
