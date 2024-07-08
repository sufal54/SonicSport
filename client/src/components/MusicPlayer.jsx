import React, { useEffect, useRef, useState } from "react";
import { GoUnmute, GoMute } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import "../css/MusicPlayer.css";
import { useDispatch, useSelector } from "react-redux";
import { setAllSongs, setSongPlaying } from "../context/action";
import { IoRepeat } from "react-icons/io5";
import { getAllSongs } from "../api";

const MusicPlayer = () => {
  const isplaying = useSelector((state) => state.isSongPlaying);
  const playinSong = useSelector((state) => state.songIndex);
  const dispatch = useDispatch();

  const songs = useSelector((state) => state.allSongs);
  const [isPlaying, setIsPlaying] = useState(isplaying);
  const [curentSong, setCurentSong] = useState(songs[playinSong]);
  const [volume, setVolume] = useState(0);
  const [loop, setLoop] = useState(false);
  const [miniplayer, setMiniplayer] = useState(false);

  const audioElem = useRef();
  const clickRef = useRef();

  const handleVolumeChange = () => {
    //handling volume
    if (volume === 1) {
      setVolume(0);
    } else {
      setVolume(1);
    }

    audioElem.current.volume = volume;
  };

  const audioPlayPuase = () => {
    //to play puase when audio playing
    setIsPlaying(!isPlaying);
  };

  const onPlaying = () => {
    //set somh to client given time
    let duration = audioElem.current.duration;
    let currentTime = audioElem.current.currentTime;
    setCurentSong({
      ...curentSong,
      progress: (currentTime / duration) * 100,
      length: duration,
    });
  };

  const checkWidth = (e) => {
    //check client selected time
    let width = clickRef.current.clientWidth;
    let offset = e.nativeEvent.offsetX;

    let divProgress = (offset / width) * 100;
    audioElem.current.currentTime = (divProgress / 100) * curentSong.length;
  };

  const timeFormat = (t) => {
    //set time in correct formate

    if (isNaN(t)) {
      return "00";
    }
    return t > 9 ? t : `0${t}`;
  };

  const skipBack = () => {
    //pre song
    let index = songs.findIndex((x) => x.name === curentSong.name);
    audioElem.current.currentTime = 0;
    if (index === 0) {
      setCurentSong(songs[songs.length - 1]);
    } else {
      setCurentSong(songs[index - 1]);
    }
  };

  const skipToNext = () => {
    //next song
    if (!loop) {
      let index = songs.findIndex((x) => x.name === curentSong.name);
      audioElem.current.currentTime = 0;
      if (index === songs.length - 1) {
        setCurentSong(songs[0]);
      } else {
        setCurentSong(songs[index + 1]);
      }
    }
  };

  const stopPlaying = () => {
    //close song
    audioElem.current.pause();
    setIsPlaying(false);
    dispatch(setSongPlaying(false));
    const player = miniplayer
      ? document.querySelector(".player-container2")
      : document.querySelector(".player-container");
    player.style.display = "none";
  };

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
      audioElem.volume = 0;
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying, curentSong]);

  useEffect(() => {
    if (!songs) {
      getAllSongs().then((data) => {
        dispatch(setAllSongs(data));
      });
    }
  }, [songs]);

  useEffect(() => {
    setCurentSong(songs[playinSong]);
    audioElem.current.play();
  }, [playinSong]);

  return (
    <div className={`${miniplayer ? "player-container2" : "player-container"}`}>
      <div id={`${miniplayer ? "player-card2" : "player-card"}`}>
        <div id={`${miniplayer ? "arrow-div2" : "arrow-div"}`}>
          <IoIosArrowDown
            id={`${miniplayer ? "down-arrow2" : "down-arrow"}`}
            onClick={() => setMiniplayer(!miniplayer)}
          />
          <RxCross1
            id={`${miniplayer ? "cross2" : "cross"}`}
            onClick={stopPlaying}
          />
        </div>
        <img
          src={`${curentSong?.imageUrl}`}
          alt="song-cover"
          id={`${miniplayer ? "songcove2" : "songcove"}`}
        />

        <div id={`${miniplayer ? "scroll-text2" : "scroll-text"}`}>
          <p id={`${miniplayer ? "song-name2" : "song-name"}`}>
            {curentSong?.name}
          </p>
        </div>

        {!miniplayer && (
          <p style={{ fontSize: "15px" }}>{curentSong?.artist}</p>
        )}

        {!miniplayer && (
          <div id="sound-bar">
            <IoRepeat
              className="sound-icon"
              style={{ color: `${loop ? "red" : ""}` }}
              onClick={() => setLoop(!loop)}
            />
            {volume === 0 ? (
              <GoUnmute className="sound-icon" onClick={handleVolumeChange} />
            ) : (
              <GoMute
                className="sound-icon"
                style={{ color: "red" }}
                onClick={handleVolumeChange}
              />
            )}
          </div>
        )}

        <audio
          src={curentSong?.songUrl}
          ref={audioElem}
          onTimeUpdate={onPlaying}
          onEnded={skipToNext}
        />

        <div
          id={`${miniplayer ? "play-bar2" : "play-bar"}`}
          onClick={checkWidth}
          ref={clickRef}
        >
          <div
            id={`${miniplayer ? "seek_bar2" : "seek_bar"}`}
            style={{ width: `${curentSong.progress + "%"}` }}
          ></div>
          <div id={`${miniplayer ? "round-bar2" : "round-bar"}`}></div>
        </div>

        {!miniplayer && (
          <div id="time">
            <div id="play-time">
              <span>
                {timeFormat(Math.floor(audioElem.current?.currentTime / 60))}
              </span>
              :
              <span>
                {timeFormat(Math.floor(audioElem.current?.currentTime % 60))}
              </span>
            </div>

            <div id="total-time">
              <span>
                {timeFormat(Math.floor(audioElem.current?.duration / 60))}
              </span>
              :
              <span>
                {timeFormat(Math.floor(audioElem.current?.duration % 60))}
              </span>
            </div>
          </div>
        )}

        <div id={`${miniplayer ? "player-icons2" : "player-icons"}`}>
          <MdOutlineSkipPrevious
            className={`${miniplayer ? "play-icon2" : "play-icon"}`}
            onClick={skipBack}
          />
          {isPlaying ? (
            <CiPause1
              className={`${miniplayer ? "play-icon2" : "play-icon"} `}
              onClick={audioPlayPuase}
            />
          ) : (
            <CiPlay1
              className={`${miniplayer ? "play-icon2" : "play-icon"}`}
              onClick={audioPlayPuase}
            />
          )}
          <MdOutlineSkipNext
            className={`${miniplayer ? "play-icon2" : "play-icon"}`}
            onClick={skipToNext}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
