import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtists, getAllSongs } from "../api";
import { setAllArtists, setAllSongs, setTopSongs } from "../context/action";
import ScrollCard from "./ScrollCard";
import "../css/Container.css";
import ArtistList from "./ArtistList";

const SongContainer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const allSongList = state?.allSongs;

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
    if (!state.topSongs) {
      let topSongs = allSongList?.sort((a, b) => b.vote - a.vote);
      dispatch(setTopSongs(topSongs));
    }
  }, [state.allSongs, state.allArtist]);

  return (
    <>
      <div className="contaner">
        <h3>Top 10 Songs</h3>
        <div className="cards-scroll">
          <div className="cards">
            {state?.topSongs?.map((data, i) =>
              i < 11 ? (
                <ScrollCard data={data} i={i} list={"top-Songs"} />
              ) : null
            )}
          </div>
        </div>
        <h3>New Songs</h3>
        <div className="cards-scroll">
          <div className="cards">
            {allSongList?.map((data, i) =>
              i < 16 ? (
                <ScrollCard data={data} i={i} list={"new-Songs"} />
              ) : null
            )}
          </div>
        </div>

        <h3>Artists</h3>
        <div className="cards-scroll">
          <div className="cards">
            {state.allArtist?.map((data, i) => (
              <ScrollCard data={data} i={i} />
            ))}
          </div>
        </div>
      </div>
      {state?.artistCard && <ArtistList />}
    </>
  );
};

export default SongContainer;
