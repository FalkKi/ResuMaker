import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import styles from './personalData.module.css';
import { postCV } from '../../requests/cvRequests';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Avatar from '@mui/material/Avatar';
import ProfSummary from './../profSummary/ProfSummary';
import WorkHistory from '../Histories/workHistiory/WorkHistory';
import { EducationHistoryType, LanguageHistoryType, PersonalDataProps, SkillsHistoryType, User, UserEducationHistory, UserSkillType } from '../../types/types';
import { WorkHistoryType } from '../../types/types';
import EducationHistory from '../Histories/EducationHistory/EducationHistory';
import Languages from '../Histories/Languages/Languages';
import Skills from '../Histories/Skills/Skills';
import StartUserInfo from '../StartUserInformation/StartUserInformation';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import '../../fonts/Roboto/Roboto-Regular.ttf';
import deleteBtn from '../../pictures/deleteBtn.svg';
import { updateCV } from './../../requests/cvRequests';
import instance from './../../requests/mainAxios';
// import { isValidEmail } from '../../utils/generateId';


const PersonalData: React.FC<PersonalDataProps> = (props) => {
   const dispatch = useAppDispatch();
   const inputFileRef = useRef<HTMLInputElement>(null);
   const listRef = useRef<HTMLDivElement | null>(null);
   const navigate = useNavigate();
   const [isErrorEmail, setError] = useState<string | null>(null);

   function isValidEmail(email: string) {
      return /\S+@\S+\.\S+/.test(email);
   };

   const createResume = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      isValidEmail(props.userInfo.email) ? setError(null) : setError('incorrect email');

      //here

      if (!props.id) {
         dispatch(postCV(props.userInfo));
         navigate(`/showCv`);
      }
      if (props.id) {
         try {
            await instance.patch(`/makecv/${props.id}`, props.userInfo);
            navigate(`/showCv/${props.id}`);
         } catch (err) {
            console.log(err);
         };
      };
   };

   const isButtonDisabled = () => {
      return !(props.userInfo.jobTitle !== '' && props.userInfo.firstName !== ''
         && props.userInfo.lastName !== '' && props.userInfo.email !== '' && props.userInfo.country
         && props.userInfo.city !== '' && props.userInfo.birthDate !== '' && props.userInfo.profSummary !== '');
   };

   return (
      <div className={styles.container}>
         <Box
            component="form"
            sx={{
               '& .MuiTextField-root': {
                  mt: '15px',
                  mr: "20px"
               },
               maxWidth: "900px",
               margin: "auto",
               fontFamily: "Roboto",
               textTransform: 'uppercase'
            }}
         >
            <div>
               <input ref={inputFileRef} type="file" onChange={props.handleChangeFile} hidden />
               {props.userInfo.imageUrl ? (
                  <div className={styles.withFoto}>
                     <img className={styles.image} src={`http://localhost:4434${props.userInfo.imageUrl}`} alt="Uploaded" />
                     <Button sx={{
                        width: '50px',
                        height: '50px',
                        ml: '10px'
                     }} onClick={props.onClickRemoveImage} variant="contained" color="error">
                        <img className={styles.deleteBtnImg} src={deleteBtn} alt="" />
                     </Button>
                  </div>
               ) : <Button variant='contained' className={styles.imageButton} onClick={() => { inputFileRef.current !== null ? inputFileRef.current.click() : null }} size="medium">
                  <Avatar
                     alt="userAvatar"
                     src=""
                     sx={{ width: 80, height: 80 }}
                  />
                  <p>Load foto</p>
               </Button>}
               <section className={styles.personalData}>
                  <h3>Personal data</h3>
                  <StartUserInfo
                     isErrorEmail={isErrorEmail}
                     userInfo={props.userInfo}
                     eventHandler={props.eventHandler}
                  />
               </section>
               <section className={styles.personalData}>
                  <ProfSummary
                     setUserInfo={props.setUserInfo}
                     profSummary={props.userInfo.profSummary}
                     userInfo={props.userInfo}
                  />
               </section>
               <section className={styles.histories}>
                  <div ref={listRef}>

                     {props.childrenWorkHistoryArray.map((el: WorkHistoryType) => (
                        <WorkHistory
                           workData={props.userInfo.workHistory}
                           id={el.id}
                           key={el.id}
                           getUserInfoData={props.getUserInfoData}
                           deleteWorkHistoryElement={props.deleteWorkHistoryElement}
                        />
                     ))}
                  </div>
                  <Button sx={{ mb: '15px' }} fullWidth onClick={props.addMoreWorkData} variant='outlined'>
                     {props.childrenWorkHistoryArray.length > 0 ? 'Add More Work history' : 'Add Work history'}
                  </Button>
                  <>
                     {props.childrenEducationHistoryArray.map((el: EducationHistoryType) => (
                        <EducationHistory
                           id={el.id}
                           key={el.id}
                           deleteEducationHistoryElement={props.deleteEducationHistoryElement}
                           getUserInfoData={props.getUserInfoData}
                        />
                     ))}
                  </>

                  <Button sx={{ mb: '15px' }} fullWidth onClick={props.addEducationChildren} variant='outlined'>
                     {props.childrenEducationHistoryArray.length > 0 ? 'Add More' : 'Add Education history'}
                  </Button>
                  <>
                     {props.childrenLanguageHistoryArray.map((el: LanguageHistoryType) => (
                        <Languages
                           id={el.id}
                           key={el.id}
                           deleteLanguageHistoryElement={props.deleteLanguageHistoryElement}
                           getUserInfoData={props.getUserInfoData}
                        />
                     ))}
                  </>
                  <Button sx={{ mb: '15px' }} fullWidth onClick={props.addLanguageChildren} variant='outlined'>
                     {props.childrenLanguageHistoryArray.length > 0 ? 'Add more languages' : 'Add language'}
                  </Button>
                  <>
                     {props.childrenSkillsHistoryArray.map((el: SkillsHistoryType) => (
                        <Skills
                           id={el.id}
                           key={el.id}
                           deleteSkillsHistoryElement={props.deleteSkillsHistoryElement}
                           getUserInfoData={props.getUserInfoData}
                        />
                     ))}
                  </>
                  <Button sx={{ mb: '15px' }} fullWidth onClick={props.addSkillsChildren} variant='outlined'>
                     {props.childrenSkillsHistoryArray.length > 0 ? 'Add more Skills' : 'Add Skill'}
                  </Button>
               </section>
               <Button disabled={isButtonDisabled()} onClick={createResume} size="large" variant="contained">SAVE CHANGES</Button>
            </div>
         </Box>

      </div >
   );
};

export default PersonalData;