import React from "react";
import { useSelector } from "react-redux";
import "../css/Header.css";

const Header = () => {
  const userData = useSelector((state) => state.userData);

  return (
    <header className="header">
      <div className="header-containet">
        <p>
          {userData?.name.length < 10
            ? userData?.name
            : userData?.name.slice(0, 7) + "..."}
        </p>
        <img src={`${userData?.imageUrl}`} />
      </div>
    </header>
  );
};

export default Header;
