import React from "react";
import "../css/FiltertCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setSongIndex, setSongPlaying } from "../context/action";

const FiltertCard = ({ data }) => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.allSongs);

  const selectSong = (data) => {
    if (data?.songUrl) {
      let songIndex = songs?.findIndex((item) => item._id === data._id);
      dispatch(setSongIndex(songIndex));
      dispatch(setSongPlaying(true));
    }
  };

  return (
    <div id="filter-card" onClick={() => selectSong(data)}>
      <img src={`${data?.imageUrl}`} alt="" />
      <p>
        {data?.name.length > 19 ? `${data?.name.slice(0, 19)}...` : data?.name}
      </p>
    </div>
  );
};

export default FiltertCard;
