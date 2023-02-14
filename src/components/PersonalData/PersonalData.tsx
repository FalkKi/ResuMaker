import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import styles from './personalData.module.css';
import { postCV } from '../../requests/cvRequests';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import ProfSummary from './../profSummary/ProfSummary';
import WorkHistory from '../workHistiory/WorkHistory';
import { EducationHistoryType, LanguageHistoryType, PersonalDataProps, SkillsHistoryType, User, UserEducationHistory, UserSkillType } from '../../types/types';
import { WorkHistoryType } from '../../types/types';
import EducationHistory from './../EducationHistory/EducationHistory';
import Languages from '../Languages/Languages';
import Skills from './../Skills/Skills';
import StartUserInfo from '../StartUserInformation/StartUserInformation';
import Box from '@mui/material/Box';


const PersonalData: React.FC<PersonalDataProps> = (props) => {
   const dispatch = useAppDispatch();
   const inputFileRef = useRef<HTMLInputElement>(null);
   const listRef = useRef<HTMLDivElement | null>(null);

   const createResume = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(e)
      e.preventDefault()
      dispatch(postCV(props.userInfo));
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
               '& .MuiTextField-root': { m: 0.5, width: '100%' },
               display: 'flex',
               flexDirection: 'column',
               maxWidth: "600px",
            }}

         noValidate
         autoComplete="off"
         >
         <div>
            <input ref={inputFileRef} type="file" onChange={props.handleChangeFile} hidden />
            {props.userInfo.imageUrl ? (
               <>
                  <Button onClick={props.onClickRemoveImage} variant="contained" color="error">
                     Delete
                  </Button>
                  <img className={styles.image} src={`http://localhost:4434${props.userInfo.imageUrl}`} alt="Uploaded" />
               </>
            ) : <Button variant='contained' className={styles.imageButton} onClick={() => { inputFileRef.current !== null ? inputFileRef.current.click() : null }} size="medium">
               <Avatar
                  alt="userAvatar"
                  src=""
                  sx={{ width: 80, height: 80 }}
               />
               <p>Load foto</p>
            </Button>}

            <div className={styles.inputFields}>
               <StartUserInfo
                  userInfo={props.userInfo}
                  eventHandler={props.eventHandler}
               />
            </div>
            <ProfSummary
               setUserInfo={props.setUserInfo}
               profSummary={props.userInfo.profSummary}
               userInfo={props.userInfo}
            />
            <div ref={listRef}>
               {props.childrenWorkHistoryArray.map((el: WorkHistoryType) => (
                  <WorkHistory
                     id={el.id}
                     key={el.id}
                     getUserInfoData={props.getUserInfoData}
                     deleteWorkHistoryElement={props.deleteWorkHistoryElement}
                  />
               ))}
            </div>
            <Button fullWidth onClick={props.addMoreWorkData} variant='outlined'>
               {props.childrenWorkHistoryArray.length > 0 ? 'Add More' : 'Add Work history'}
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

            <Button fullWidth onClick={props.addEducationChildren} variant='outlined'>
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
            <Button fullWidth onClick={props.addLanguageChildren} variant='outlined'>
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
            <Button fullWidth onClick={props.addSkillsChildren} variant='outlined'>
               {props.childrenSkillsHistoryArray.length > 0 ? 'Add more Skills' : 'Add Skill'}
            </Button>

            <Button disabled={isButtonDisabled()} onClick={(e) => createResume(e)} size="large" variant="contained">SAVE CHANGES</Button>
         </div>
      </Box>
      </div >
   );
};

export default PersonalData;