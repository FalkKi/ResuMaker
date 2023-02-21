import React from 'react';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { fetchCVs } from './../../requests/cvRequests';
import { useEffect } from 'react';
import styles from './finalCV.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';


const FinalCV: React.FC = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const userCvs = useAppSelector(state => state.setCVs.cvInfo);
   const isLoaded = useAppSelector(state => state.setCVs.cvInfo.status);
   useEffect(() => {
      dispatch(fetchCVs());
   }, []);
  
   return (
      <>
         {isLoaded === 'loaded' ? <Box sx={{ display: 'flex', bgcolor: "#323232", height: '90vh' }}>
            <div>
               <Button onClick={() => navigate(-1)} sx={{ margin: ' 20px 20px 0 20px' }} variant='contained' size='small'>Go back</Button>
            </div>
            <div className={styles.container}>

               <div className={styles.personalInfo}>
                  
                  <img className={styles.userFoto} src={`http://localhost:4434${userCvs.userInfo.imageUrl}`} alt="" />
               </div>
               <div className={styles.personalDetails}>
               
               </div>
            </div>
            <div>
               <Button sx={{ margin: ' 20px 20px 0 0px' }} variant='outlined' size='large'>Save PDF</Button>
            </div>
         </Box> : <Preloader />}
      </>
   )
}

export default FinalCV;