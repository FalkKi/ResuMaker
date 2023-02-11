import React from "react";
import styles from './header.module.css';
import logo from '../../pictures/logo.svg'


const Header: React.FC = () => {
   return (
      <>
         <header className={styles.headerWrapper}>
            <div className={styles.container}>
               <img src={logo} alt='logo' className={styles.logo}></img>
            </div>
         </header>
      </>
   );
};

export default Header;