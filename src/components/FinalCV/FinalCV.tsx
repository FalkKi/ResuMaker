import React from 'react';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { fetchCVs } from './../../requests/cvRequests';
import { useEffect } from 'react';
import styles from './finalCV.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import '../../fonts/Roboto/Roboto-Regular.ttf';


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
         {isLoaded === 'loaded' ? <Box sx={{
            display: 'flex',
            bgcolor: "#323232",
            height: '90vh',
            fontFamily: "Roboto",
         }}>
            <div>
               <Button onClick={() => navigate(-1)} sx={{ margin: ' 20px 20px 0 20px' }} variant='contained' size='small'>Go back</Button>
            </div>
            <div className={styles.container}>

               <section className={styles.personalInfo}>
                  <img className={styles.userFoto} src={`http://localhost:4434${userCvs.userInfo.imageUrl}`} alt="" />
                  <p>{userCvs.userInfo.jobTitle}</p>
                  <p>{userCvs.userInfo.email}</p>
                  <p>{userCvs.userInfo.birthDate}</p>
                  <p>{userCvs.userInfo.country}</p>
                  <p>{userCvs.userInfo.city}</p>
               </section>
               <section className={styles.personalDetails}>
                  <div>
                     <h3>Profile</h3>
                     {userCvs.userInfo.profSummary}
                  </div>
                  <div>
                     <h3>Work history</h3>
                     <ul>
                        {userCvs.userInfo.workHistory.map((el) => {
                           return (
                              <li key={el.id}>
                                 <h3>{el.position}</h3>
                                 <p>{el.company}</p>
                                 <p>{el.startDate}-{el.endDate}</p>
                                 <p>{el.description}</p>
                              </li>
                           )
                        })}
                     </ul>
                  </div>
                  <div>
                     <h3>Education history</h3>
                     <ul>
                        {userCvs.userInfo.educationHistory.map((el) => {
                           return (
                              <li key={el.id}>
                                 <h3>{el.institution}</h3>
                                 <p>{el.studies}</p>
                                 <p>{el.startDate}-{el.endDate}</p>
                                 <p>{el.description}</p>
                                 <p>{el.location}</p>
                              </li>
                           )
                        })}
                     </ul>
                  </div>
                  <div>
                     <h3>Languages</h3>
                     <ul>
                        {userCvs.userInfo.languages.map((el) => {
                           return (
                              <li key={el.id}>
                                 <h3>{el.languageName}</h3>
                                 <p>{el.level}</p>
                              </li>
                           )
                        })}
                     </ul>
                  </div>
                  <div>
                     <h3>Skills</h3>
                     <ul>
                        {userCvs.userInfo.skills.map((el) => {
                           return (
                              <div key={el.id}>
                                 <li key={el.id}>
                                    <h3>{el.skillName}</h3>
                                    <p>{el.skillLevel}</p>
                                 </li>
                                 <div className={styles.skillLevel}>
                                    {el.skillLevel === 'Student' ? <div className={styles.skillGradeStudent}></div> : null}
                                    {el.skillLevel === 'Basic skills' ? <div className={styles.skillGradeBasic}></div> : null}
                                    {el.skillLevel === 'Medium' ? <div className={styles.skillGradeMedium}></div> : null}
                                    {el.skillLevel === 'Professional' ? <div className={styles.skillGradeProfi}></div> : null}
                                 </div>
                              </div>
                           )
                        })}
                     </ul>

                  </div>
               </section>
            </div>
            <div>
               <Button sx={{ margin: ' 20px 20px 0 0px' }} variant='outlined' size='large'>Save PDF</Button>
            </div>
         </Box> : <Preloader />}
      </>
   )
}

export default FinalCV;