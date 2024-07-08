import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Dashboard, DashboardArtists, DashboardSongs, DashboardUsers, Footer, Header, Home, Login, MusicRoute, SideBar } from './components';
import { app } from './config/firebase.config';
import { getAuth } from 'firebase/auth';
import { vaildateUser } from './api';
import { useDispatch } from 'react-redux';
import { setUserData } from './context/action';
import './App.css';

function App() {

  const [admin, setAdmin] = useState(false);

  const firbaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");

  useEffect(() => {
    firbaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken(true).then((token) => {
          vaildateUser(token).then((data) => {
            dispatch(setUserData(data));
            if (data.role === "admin") {
              setAdmin(true);
            }
          });
        });
      } else {
        window.localStorage.setItem("auth", "false");
        setAuth(false);
        navigate("/login");
      }
    })
  }, []);

  return (
    <>
      {
        auth && <SideBar />
      }
      {
        auth && <Header />
      }

      <Routes>
        <Route path='/login' element={<Login setAuth={setAuth} />} />
        <Route path='/music' element={<MusicRoute />} />
        <Route path='/*' element={<Home />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/dashboard/admin-allusers' element={<DashboardUsers />} />
        <Route path='/dashboard/admin-allsongs' element={<DashboardSongs />} />
        <Route path='/dashboard/admin-allartists' element={<DashboardArtists />} />
      </Routes>

      {
        auth && <Footer />
      }
    </>
  );
};

export default App;
