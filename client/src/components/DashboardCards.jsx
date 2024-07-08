import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  getAllArtists,
  getAllSongs,
  getAllUsers,
  removeArtist,
  removeSong,
  removeUser,
  updateUserRole,
} from "../api";
import { setAllArtists, setAllSongs, setAllUsers } from "../context/action";
import "../css/DashboardCards.css";

export const Cards = ({ data, index, song, users, artist }) => {
  const [isUserRoleUpdate, setIsUserRoleUpdate] = useState(false);
  const dispatch = useDispatch();

  let name = song
    ? data.name.length > 20
      ? data.name.slice(0, 20)
      : data.name
    : data.name;
  let userRole = data?.role === "admin" ? "Admin" : "Member";
  let admin = userRole === "Admin" ? true : false;

  let userRoleUpdate = (user, user_id, role) => {
    if (!user) {
      return;
    } else {
      updateUserRole(user_id, role).then((res) => {
        if (res) {
          getAllUsers().then((data) => {
            dispatch(setAllUsers(data));
          });
        }
      });
      setIsUserRoleUpdate(false);
    }
  };

  const userRoleAlert = () => {
    if (users) {
      setIsUserRoleUpdate(true);
    }
  };

  const deleteData = (id) => {
    if (users) {
      removeUser(id).then((res) => {
        if (res) {
          getAllUsers().then((data) => {
            dispatch(setAllUsers(data));
          });
        }
      });
    } else if (song) {
      removeSong(id).then((res) => {
        if (res) {
          getAllSongs().then((data) => {
            dispatch(setAllSongs(data));
          });
        }
      });
    } else if (artist) {
      removeArtist(id).then((res) => {
        getAllArtists().then((data) => {
          dispatch(setAllArtists(data));
        });
      });
    }
  };

  return (
    <div className="manage-card">
      <div className="info" onClick={() => userRoleAlert()}>
        <img src={`${data?.imageUrl}`} alt="" />
        {users && <div id={`${admin ? "admin" : "user-Role"}`}>{userRole}</div>}
        <p>{name}</p>
      </div>
      <div className="cancel-icon" onClick={() => deleteData(data?._id)}>
        <RxCross1 id="cancel" />
      </div>

      {isUserRoleUpdate && (
        <div id="isUserUpdate">
          <div id="Update-alert">
            <h3>Do You Want To update</h3>
            <p>User:{name}</p>
            <p>Email:{data.email}</p>
            <p>as {data.role === "admin" ? "Member" : "Admin"}</p>
          </div>
          <div id="yes-no">
            <p
              style={{ color: "red" }}
              onClick={() => {
                userRoleUpdate(users, data._id, data.role);
              }}
            >
              Yes
            </p>
            <p onClick={() => setIsUserRoleUpdate(false)}>No</p>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardCards = ({ cardData, song, users, artist }) => {
  return (
    <div className="cards-conatiner">
      {cardData?.map((data, index) => (
        <Cards
          data={data}
          index={index}
          song={song}
          users={users}
          artist={artist}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
