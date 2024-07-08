import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollCard from "./ScrollCard";
import { RxCross1 } from "react-icons/rx";
import { getAllArtists, getAllSongs } from "../api";
import { setAllArtists, setAllSongs, setArtistCard } from "../context/action";
import "../css/ArtistList.css";

const ArtistList = () => {
  const state = useSelector((state) => state);
  const artistData = state?.selectArtistData;
  const dispatch = useDispatch();
  const allSongList = state.allSongs;

  useEffect(() => {
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
  }, [state.allSongs, state.allArtist]);
  return (
    <div id="artistlist">
      <RxCross1
        id="cross-icon"
        onClick={() => dispatch(setArtistCard(false))}
      />
      <div id="artist-details">
        <img src={`${artistData?.imageUrl}`} alt="" />
        <h3>{artistData?.name}</h3>
      </div>

      <div id="artist-list">
        {allSongList?.map((data, i) =>
          data.artist == artistData?.name ? (
            <ScrollCard data={data} i={i} list={"new-Songs"} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default ArtistList;
