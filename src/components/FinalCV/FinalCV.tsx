import React from 'react';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { deleteCV, fetchCVs } from './../../requests/cvRequests';
import { useEffect, useRef } from 'react';
import styles from './finalCV.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import '../../fonts/Roboto/Roboto-Regular.ttf';
import user from '../../pictures/user.svg';
import { PDFExport } from '@progress/kendo-react-pdf';
import {
   LanguageInfoType,
   UserEducationHistory,
   UserSkillType,
   UserWorkHistory
} from '../../types/types';


const FinalCV = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      dispatch(fetchCVs());
   }, []);

   const pdfExportComponent = useRef<any>(null);
   const id = useAppSelector(state => state.setCVs.cvInfo._id);
   const userCvs = useAppSelector(state => state.setCVs.cvInfo);
   const isLoaded = useAppSelector(state => state.setCVs.cvInfo.status);


   const createNewCv = async () => {
      try {
         await dispatch(deleteCV(id));
         navigate('/');
      } catch (err) {
         console.log(err)
      };
   };

   const updateUserCv = () => {
      navigate(`/${id}`);
   }

   const generatePDF = () => {
      pdfExportComponent.current.save();
   };

   return (
      <>
         {isLoaded === 'loaded' ? <Box sx={{
            display: 'flex',
            bgcolor: "#323232",
            height: '90vh',
            fontFamily: 'Roboto',
            fontWeight: '12px',
            lineHeight: '12px',
         }}>
            <div>
               <Button onClick={updateUserCv} sx={{
                  margin: ' 20px 20px 0 20px',
                  textTransform: 'uppercase',
                  display: 'block'
               }} variant='contained' size='small'>EDIT
               </Button>
               <Button onClick={createNewCv} sx={{
                  margin: ' 20px 20px 0 20px',
                  textTransform: 'uppercase',
                  display: 'block'
               }} variant='contained' size='small'>Create New
               </Button>
               <Button onClick={generatePDF} sx={{ margin: ' 20px 20px 0 20px' }} variant='outlined' size='large'>Save PDF</Button>
            </div>

            <div className={styles.pdfContainer}>
               <PDFExport
                  margin={{ top: 30, left: 50, right: 50, bottom: 50 }}
                  ref={pdfExportComponent}
                  paperSize="A4"
               >
                  <div className={styles.container}>
                     <section className={styles.personalInfo}>
                        {userCvs.imageUrl !== '' ?
                           <img className={styles.userFoto}
                              src={`http://localhost:4434${userCvs.imageUrl}`} alt="loadedUser" />
                           : <img className={styles.userFoto} src={user} alt="user" />}
                        <div className={styles.firstInfo}>
                           <p>{userCvs.firstName} {userCvs.lastName}</p>
                           <p>{userCvs.jobTitle}</p>
                           <p>{userCvs.email}</p>
                           <p>{userCvs.birthDate}</p>
                           <p>{userCvs.country}</p>
                           <p>{userCvs.city}</p>
                        </div>
                        <div className={styles.userAbilities}>
                           <div className={styles.userAbility}>
                              <h3 className={styles.cvTitle}>Languages</h3>
                              <ul>
                                 {userCvs.languages.map((el: LanguageInfoType) => {
                                    return (
                                       <li className={styles.personalInfoList} key={el.id}>
                                          <span>{el.languageName}</span> - <span>{el.level}</span>
                                       </li>
                                    )
                                 })}
                              </ul>
                           </div>
                           <div className={styles.userAbility}>
                              <h3 className={styles.cvTitle}>Skills</h3>
                              <ul>
                                 {userCvs.skills.map((el: UserSkillType) => {
                                    return (
                                       <div key={el.id}>
                                          <li className={styles.personalInfoList} key={el.id}>
                                             <span>{el.skillName}</span> - <span>{el.skillLevel}</span>
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
                        </div>
                     </section>
                     <section className={styles.personalDetails}>
                        <div className={styles.userHistory}>
                           <h3>Profile</h3>
                           {userCvs.profSummary}
                        </div>
                        <div className={styles.userHistory}>
                           <h3>Work history</h3>
                           <ul className={styles.userHistoryList}>
                              {userCvs.workHistory.map((el: UserWorkHistory) => {
                                 return (
                                    <li key={el.id}>
                                       <div className={styles.userHistoryListFlex}>
                                          <h4>{el.position}</h4>
                                          <p style={{ color: '#01257D' }}>{el.startDate} - {el.endDate}</p>
                                       </div>
                                       <p>{el.company}</p>
                                       <p>{el.description}</p>
                                    </li>
                                 )
                              })}
                           </ul>
                        </div>
                        <div className={styles.userHistory}>
                           <h3>Education history</h3>
                           <ul className={styles.userHistoryList}>
                              {userCvs.educationHistory.map((el: UserEducationHistory) => {
                                 return (
                                    <li key={el.id}>
                                       <div className={styles.userHistoryListFlex}>
                                          <h4>{el.institution}</h4>
                                          <p style={{ color: '#01257D' }}>{el.startDate} - {el.endDate}</p>
                                       </div>
                                       <p>{el.studies}</p>
                                       <p>{el.location}</p>
                                       <p>{el.description}</p>
                                    </li>
                                 )
                              })}
                           </ul>
                        </div>
                     </section>
                  </div>
               </PDFExport>
            </div>
         </Box> : <Preloader />}
      </>
   )
}



export default FinalCV;