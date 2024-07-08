import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import "../css/FilterButton.css";
import { useDispatch } from "react-redux";
import {
  setFilterAlbum,
  setFilterArtist,
  setFilterCategory,
  setFilterLanguage,
} from "../context/action";

const FilterButton = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(flag);
  const [filterMenu, setFilterMenu] = useState(false);
  const dispatch = useDispatch();

  const updateFilter = (data, flag) => {
    setFilterName(data.name);
    setFilterMenu(!filterMenu);
    if (flag === "Artist") {
      dispatch(setFilterArtist(data.name));
    } else if (flag === "Album") {
      dispatch(setFilterAlbum(data.name));
    } else if (flag === "Language") {
      dispatch(setFilterLanguage(data.name));
    } else if (flag === "Category") {
      dispatch(setFilterCategory(data.name));
    }
  };

  return (
    <div id="filter-button">
      <p onClick={() => setFilterMenu(!filterMenu)}>
        {filterName} <IoChevronDown id="filter-icon" />
      </p>

      <div id="menu">
        {filterData &&
          filterMenu &&
          filterData?.map((data) => (
            <p onClick={() => updateFilter(data, flag)}>{data.name}</p>
          ))}
      </div>
    </div>
  );
};

export default FilterButton;
