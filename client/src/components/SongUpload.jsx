import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlbums, getAllArtists, getAllSongs, saveNewSong } from "../api";
import { setAllAlbums, setAllArtists, setAllSongs } from "../context/action";
import FilterButton from "./FilterButton";
import { filter, filterByLanguage } from "../utils/supportfunction";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiLoaderFill } from "react-icons/ri";
import SongUploadCard from "./SongUploadCard";
import { RxCross2 } from "react-icons/rx";
import "../css/SongUpload.css";
const SongUpload = ({ setUploadMenu }) => {
  const [songName, setSongName] = useState("");
  const [submitData, setSubmitData] = useState(null);

  const [buttonColor, setButtonColor] = useState(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [state.allAlbum, state.allArtist, dispatch]);

  const submitSong = () => {
    if (submitData) {
      saveNewSong(submitData).then(() => {
        getAllSongs().then((data) => {
          dispatch(setAllSongs(data));
        });
      });
      setSongName("");
      setButtonColor(false);
    }
  };

  return (
    <div id="song-update">
      <RxCross2 id="cross-icon" onClick={() => setUploadMenu(false)} />
      <input
        type="text"
        placeholder="Type Song Name..."
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <div id="filter">
        <FilterButton
          state={state}
          filterData={state.allArtist}
          flag={"Artist"}
        />
        <FilterButton filterData={state.allAlbum} flag={"Album"} />
        <FilterButton filterData={filterByLanguage} flag={"Language"} />
        <FilterButton filterData={filter} flag={"Category"} />
      </div>

      <div id="documante-upload">
        <SongUploadCard
          buttonColor={buttonColor}
          setButtonColor={setButtonColor}
          isImage={true}
          songName={songName}
          submitData={submitData}
          setSubmitData={setSubmitData}
        />
      </div>
      <div id="submit-button">
        <button onClick={submitSong}>Submit</button>
      </div>
    </div>
  );
};

export const FilterLoader = ({ progress }) => {
  return (
    <div id="filter-loader">
      <p id="progressing">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div id="pro-load">
        <RiLoaderFill id="load-bar" />
      </div>
    </div>
  );
};

export const Filteruploader = ({
  updateState,
  setProgress,
  isloading,
  whatUpload,
  artist,
}) => {
  let file = whatUpload ? "image" : "audio";

  file = artist ? "artist" : file;

  const uploadFile = (e) => {
    isloading(true);
    let uploadedFile = e.target.files[0];
    let storageRef = ref(storage, `${file}/${Date.now()}-${uploadedFile.name}`);
    let uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log("firebase uploadin error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          updateState(downloadUrl);
          isloading(false);
        });
      }
    );
  };

  return (
    <label>
      <div id="file-upload">
        <div id="data">
          <FaCloudUploadAlt id="upload-icon" />
          <p>Click to upload {whatUpload}</p>
        </div>
      </div>
      <input
        style={{ display: "none" }}
        onChange={uploadFile}
        type="file"
        name="upload-file"
        accept={`${file}/*`}
      />
    </label>
  );
};

export default SongUpload;
