import React from "react";
import styles from './header.module.css';
import logo from '../../pictures/logo.svg'
import { useAppSelector, useAppDispatch } from './../../redux/store';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { logout } from "../../redux/authReducer";


const Header: React.FC = () => {
   const isAuth = useAppSelector(state => state.auth.data);
   console.log(isAuth);
   const dispatch = useAppDispatch();
   const onClickLogout = () => {
      dispatch(logout());
      window.localStorage.removeItem('token');
   };
   return (
      <>
         <header className={styles.headerWrapper}>
            <div className={styles.container}>
               <a href="https://github.com/FalkKi"><img src={logo} alt='logo' className={styles.logo}></img></a>
               
            </div>

         </header>
      </>
   );
};

export default Header;