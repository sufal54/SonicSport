import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardCards from "./DashboardCards";
import { getAllUsers } from "../api";
import { setAllUsers } from "../context/action";
import "../css/DashboardUsers.css";

const DashboardUsers = () => {
  const usersData = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usersData) {
      getAllUsers().then((data) => {
        dispatch(setAllUsers(data));
      });
    }
  }, []);

  return (
    <div className="contaner">
      <div className="user-manage">
        <h3>List of All Users</h3>
        <DashboardCards cardData={usersData} users={true} />
      </div>
    </div>
  );
};

export default DashboardUsers;
