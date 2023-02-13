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

const PersonalData: React.FC<PersonalDataProps> = (props) => {
   const dispatch = useAppDispatch();
   const inputFileRef = useRef<HTMLInputElement>(null);
   const listRef = useRef<HTMLDivElement | null>(null);
   const createResume = () => {
      dispatch(postCV(props.userInfo));
   };

   const isButtonDisabled = () => {
      return !(props.userInfo.jobTitle !== '' && props.userInfo.firstName !== ''
         && props.userInfo.lastName !== '' && props.userInfo.imageUrl !== '' && props.userInfo.email !== '' && props.userInfo.country
         && props.userInfo.city !== '' && props.userInfo.birthDate !== '');
   };


   return (
      <div className={styles.container}>
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
               <TextField
                  className={styles.infoField}
                  label="Job title" value={props.userInfo.jobTitle}
                  onChange={props.eventHandler}
                  placeholder='jobTitle' type='text' />
               <TextField
                  className={styles.infoField}
                  label="your name" value={props.userInfo.firstName}
                  onChange={props.eventHandler}
                  placeholder='firstName' type='text' />
               <TextField
                  className={styles.infoField}
                  label="your surname" value={props.userInfo.lastName}
                  onChange={props.eventHandler}
                  placeholder='lastName' type='text' />
               <TextField
                  className={styles.infoField}
                  label="email" value={props.userInfo.email}
                  onChange={props.eventHandler}
                  placeholder='email' type='text' />
               <TextField
                  className={styles.infoField}
                  label="date of birth" value={props.userInfo.birthDate}
                  onChange={props.eventHandler}
                  placeholder='birthDate' type='text' />
               <TextField
                  className={styles.infoField}
                  label="country" value={props.userInfo.country}
                  onChange={props.eventHandler}
                  placeholder='country' type='text' />
               <TextField
                  className={styles.infoField}
                  label="city" value={props.userInfo.city}
                  onChange={props.eventHandler}
                  placeholder='city' type='text' />
            </div>
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

         <Button onClick={createResume} size="large" variant="contained">SAVE CHANGES</Button>
      </div>
   );
};

export default PersonalData;