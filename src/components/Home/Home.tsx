import React from "react";
import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

   const navigate = useNavigate();
   const navigateToCvCreation = () => {
      navigate("/createCV");
   };
   
   return (
      <div className={styles.container}>
         <div className={styles.btnContainer}>
            <button onClick={navigateToCvCreation} className={styles.homeBtn}>Create new CV</button>
            <button className={styles.homeBtn}>Edit your CV</button>
         </div>
      </div>
   );
};

export default Home;
