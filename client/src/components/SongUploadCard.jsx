import React, { useEffect, useState } from "react";
import { FilterLoader, Filteruploader } from "./SongUpload";
import { MdDeleteForever } from "react-icons/md";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useSelector } from "react-redux";
import "../css/SongUploadCard.css";

const SongUploadCard = ({
  isImage,
  setSubmitData,
  songName,
  buttonColor,
  setButtonColor,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const state = useSelector((state) => state);

  const deletFileObject = (url) => {
    const deleteRef = ref(storage, url);
    if (isImage) {
      setIsImageLoading(true);
      deleteObject(deleteRef).then(() => {
        setSongImageCover(null);
        setIsImageLoading(false);
      });
    } else {
      setIsAudioLoading(true);
      deleteObject(deleteRef).then(() => {
        setAudioImageCover(null);
        setIsAudioLoading(false);
      });
    }
  };

  useEffect(() => {}, [songImageCover, audioImageCover, state.allAlbum]);

  const setData = () => {
    setIsAudioLoading(true);
    setIsImageLoading(true);
    setSubmitData({
      name: songName,
      imageUrl: songImageCover,
      songUrl: audioImageCover,
      ablum: state.filterAlbum,
      artist: state.filterArtist,
      language: state.filterLanguage,
      category: state.filterCategory,
    });
    setIsAudioLoading(false);
    setIsImageLoading(false);
    setAudioImageCover(null);
    setSongImageCover(null);
    setButtonColor(true);
  };
  return (
    <>
      <div id="song-image">
        {isImageLoading && <FilterLoader progress={imageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!songImageCover ? (
              <Filteruploader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isloading={setIsImageLoading}
                whatUpload={isImage}
              />
            ) : (
              <div id="song-cover">
                <img src={`${songImageCover}`} id="cover" alt="image" />
                <button
                  type="button"
                  onClick={() => deletFileObject(songImageCover)}
                >
                  <MdDeleteForever id="file-delete-icon" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div id="song-image">
        {isAudioLoading && <FilterLoader progress={audioUploadingProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <Filteruploader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadingProgress}
                isloading={setIsAudioLoading}
                whatUpload={false}
              />
            ) : (
              <div id="song-cover">
                <audio src={`${audioImageCover}`} controls id="cover" />
                <button
                  type="button"
                  onClick={() => deletFileObject(audioImageCover)}
                >
                  <MdDeleteForever id="file-delete-icon" />
                </button>
              </div>
            )}
          </>
        )}
        <button
          onClick={setData}
          style={{ background: `${buttonColor ? "pink" : ""}` }}
          id="all-okay"
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default SongUploadCard;
