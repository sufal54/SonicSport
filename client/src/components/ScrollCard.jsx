import React from "react";
import "../css/ScrollCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setArtistCard,
  setArtistData,
  setSongIndex,
  setSongPlaying,
} from "../context/action";

const ScrollCard = (data, list) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const selectSong = (data) => {
    if (data?.data?.songUrl) {
      if (list === "top-Songs") {
        let songIndex = state?.topSongs?.findIndex(
          (item) => item._id === data.data._id
        );
        dispatch(setSongIndex(songIndex));
        dispatch(setSongPlaying(true));
      } else {
        let songIndex = state?.allSongs?.findIndex(
          (item) => item._id === data.data._id
        );
        dispatch(setSongIndex(songIndex));
        dispatch(setSongPlaying(true));
      }
    } else {
      dispatch(setArtistCard(true));
      dispatch(setArtistData(data.data));
    }
  };

  return (
    <>
      <div className="playCard" onClick={() => selectSong(data)}>
        <div className="play-item">
          <img id="play-img" src={`${data.data?.imageUrl}`} alt="" />
          <p>
            {data.data?.name.length > 7
              ? `${data.data?.name.slice(0, 7)}...`
              : data.data?.name}
          </p>
          <p>{data.data?.artist}</p>
        </div>
      </div>
    </>
  );
};

export default ScrollCard;
