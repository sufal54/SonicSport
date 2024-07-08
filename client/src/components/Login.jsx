import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { app } from "../config/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "../css/Login.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../context/action";
import { vaildateUser } from "../api";

const Login = ({ setAuth }) => {
  const firbaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginWithGoogle = async () => {
    await signInWithPopup(firbaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firbaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              vaildateUser(token).then((data) => {
                dispatch(setUserData(data));
              });
            });
            navigate("/home", { replace: true });
          } else {
            setAuth(false);
            dispatch(setUserData(null));
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/home");
    }
  }, []);

  return (
    <div className="login-container">
      <div id="login">
        <div id="log">
          <h3>Sign Up</h3>
          <div id="google" onClick={loginWithGoogle}>
            <FcGoogle id="gooogle-icon" />
            <p>Sign-Up With Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
