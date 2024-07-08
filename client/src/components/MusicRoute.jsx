import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollCard from "./ScrollCard";
import { getAllSongs } from "../api";
import { setAllSongs } from "../context/action";
import { IoFilter } from "react-icons/io5";
import "../css/MusicRoute.css";
import MusicPlayer from "./MusicPlayer";

const MusicRoute = () => {
  const allSongs = useSelector((state) => state.allSongs);
  const isplaying = useSelector((state) => state.isSongPlaying);
  const dispatch = useDispatch();

  const [isFilterOn, setIsFilterOn] = useState(false);
  const [filterSongs, setFilterSongs] = useState(allSongs?.map((item) => item));
  let sortSongs = filterSongs?.map((item) => item);

  const sortIng = (type) => {
    if (type === "popular") {
      sortSongs?.sort((a, b) => b.vote - a.vote);
      setFilterSongs(sortSongs);
    } else {
      sortSongs?.sort((a, b) => b.createdAt - a.createdAt);
      setFilterSongs(sortSongs);
    }
    setIsFilterOn(false);
  };

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch(setAllSongs(data));
      });
    }

    allSongs?.forEach((item) => {
      item.createdAt = new Date(item.createdAt).getTime();
    });
  }, [allSongs]);

  return (
    <>
      <div id="containt">
        <h3>Listen Your Fav&#9829; Song</h3>
        <div id="filter">
          <IoFilter
            id="filter-icon"
            onClick={() => setIsFilterOn(!isFilterOn)}
          />
          <p onClick={() => setIsFilterOn(!isFilterOn)}>Sort</p>
        </div>
        {isFilterOn && (
          <div id="filter-menu">
            <div className="option" onClick={() => sortIng("new")}>
              New
            </div>
            <div className="option" onClick={() => sortIng("popular")}>
              Popular
            </div>
          </div>
        )}
        <div id="list">
          {filterSongs?.map((data, i) => (
            <ScrollCard data={data} i={i} list={"new-Songs"} />
          ))}
        </div>
      </div>
      {isplaying && <MusicPlayer />}
    </>
  );
};

export default MusicRoute;
