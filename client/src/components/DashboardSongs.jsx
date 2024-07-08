import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import DashboardCards from "./DashboardCards";
import { useDispatch, useSelector } from "react-redux";
import "../css/DashboardSongs.css";
import { getAllSongs } from "../api";
import { setAllSongs } from "../context/action";
import SongUpload from "./SongUpload";
const DashboardSongs = () => {
  const songsData = useSelector((state) => state.allSongs);
  const dispatch = useDispatch();
  const [uploadMenu, setUploadMenu] = useState(false);

  useEffect(() => {
    if (!songsData) {
      getAllSongs().then((data) => {
        dispatch(setAllSongs(data));
      });
    }
  }, [songsData]);

  return (
    <div className="contaner">
      <div id="song">
        <h3>Add New Songs</h3>
        <div id="add-icon" onClick={() => setUploadMenu(true)}>
          <IoIosAdd id="add" />
        </div>
        <DashboardCards cardData={songsData} song={true} />
      </div>
      {uploadMenu && <SongUpload setUploadMenu={setUploadMenu} />}
    </div>
  );
};

export default DashboardSongs;
