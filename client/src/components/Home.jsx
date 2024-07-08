import React from "react";
import { Container, MusicPlayer } from "./index";
import { useSelector } from "react-redux";

const Home = () => {
  const isplaying = useSelector((state) => state.isSongPlaying);

  return (
    <>
      <Container />
      {isplaying && <MusicPlayer />}
    </>
  );
};

export default Home;
