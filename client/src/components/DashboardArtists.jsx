import React, { useEffect, useState } from "react";
import DashboardCards from "./DashboardCards";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtists, saveNewArtist } from "../api";
import { setAllArtists } from "../context/action";
import { IoIosAdd } from "react-icons/io";
import "../css/DashboardArtists.css";
import { FilterLoader, Filteruploader } from "./SongUpload";
import { MdDeleteForever } from "react-icons/md";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";
import { RxCross1 } from "react-icons/rx";

export const ArtistUpload = ({ setUpladMenu }) => {
  const [artistName, setArtistName] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [instagramId, setInstagramId] = useState("");

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistLoading, setIsArtistLoading] = useState(false);

  const dispatch = useDispatch();

  const deletFileObject = (url) => {
    const deleteRef = ref(storage, url);
    setIsArtistLoading(true);
    deleteObject(deleteRef).then(() => {
      setArtistImageCover(null);
      setIsArtistLoading(false);
    });
  };

  const setData = () => {
    setIsArtistLoading(true);
    const artistData = {
      name: artistName,
      imageUrl: artistImageCover,
      twitter: twitterId,
      instagram: instagramId,
    };

    if (artistData) {
      saveNewArtist(artistData).then((res) => {
        if (res) {
          getAllArtists().then((data) => {
            dispatch(setAllArtists(data));
          });
        }
      });
    }

    setIsArtistLoading(false);
    setArtistImageCover(null);
    setArtistName("");
    setTwitterId("");
    setInstagramId("");
  };

  return (
    <div id="artist-upload">
      <div id="icon-cross">
        <RxCross1 id="cross-icon" onClick={() => setUpladMenu(false)} />
      </div>
      <h3>Artist Upload</h3>
      <label id="artist-imag-Box">
        <input type="file" name="upload-file" accept={`image/*`} />
        {isArtistLoading && <FilterLoader progress={artistUploadingProgress} />}
        {!isArtistLoading && (
          <>
            {!artistImageCover ? (
              <Filteruploader
                updateState={setArtistImageCover}
                setProgress={setArtistUploadingProgress}
                isloading={setIsArtistLoading}
                artist={true}
              />
            ) : (
              <div id="song-cover">
                <audio src={`${artistImageCover}`} controls id="cover" />
                <button
                  type="button"
                  onClick={() => deletFileObject(artistImageCover)}
                >
                  <MdDeleteForever id="file-delete-icon" />
                </button>
              </div>
            )}
          </>
        )}
      </label>
      <input
        type="text"
        placeholder="Enter artist name..."
        id="artist-name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter twitter account..."
        id="artist-name"
        value={twitterId}
        onChange={(e) => setTwitterId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter instagrame account.."
        id="artist-name"
        value={instagramId}
        onChange={(e) => setInstagramId(e.target.value)}
      />
      <div id="artist-submit">
        <button onClick={setData}>Submit</button>
      </div>
    </div>
  );
};

const DashboardArtists = () => {
  const [upladMenu, setUpladMenu] = useState(false);

  const artistsData = useSelector((state) => state.allArtist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!artistsData) {
      getAllArtists().then((data) => {
        dispatch(setAllArtists(data));
      });
    }
  }, []);

  return (
    <div className="contaner">
      <div className="user-manage">
        <h3>List of All Artists</h3>
        <div id="add-icon">
          <IoIosAdd id="add" onClick={() => setUpladMenu(true)} />
        </div>
        <DashboardCards cardData={artistsData} artist={true} />
      </div>
      {upladMenu && <ArtistUpload setUpladMenu={setUpladMenu} />}
    </div>
  );
};

export default DashboardArtists;
