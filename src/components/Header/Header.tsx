import React from "react";
import styles from "./header.module.css";
import logo from "../../pictures/logo.svg";
import { useAppSelector, useAppDispatch } from "./../../redux/store";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authReducer";

const Header: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/home");
  };
  return (
    <>
      <header className={styles.headerWrapper}>
        <div className={styles.container}>
          <a href="https://github.com/FalkKi">
            <img src={logo} alt="logo" className={styles.logo}></img>
          </a>
          {isAuth != null ? (
            <Button onClick={onClickLogout} variant="contained">
              Logout
            </Button>
          ) : null}
        </div>
      </header>
    </>
  );
};

export default Header;
