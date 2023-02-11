import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { fetchCVs, postCV } from './../../requests/cvRequests';
import styles from '../../app.module.css';
import PersonalDataContainer from './../PersonalData/PersonalDataContainer';


const Home: React.FC = () => {
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(fetchCVs());
   }, []);

   return (
      <div className={styles.container}>
         <div className={styles.personInfo}>
            <PersonalDataContainer />
         </div>
      </div>
   );
};

export default Home;