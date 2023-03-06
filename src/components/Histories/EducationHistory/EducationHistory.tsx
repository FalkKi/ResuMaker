import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { EducationHistoryProps, UserEducationHistory } from '../../../types/types';
import Collapse from '@mui/material/Collapse';
import CollapsedComponent from '../../CollapsedComponent/CollapsedComponent';
import styles from '../histories.module.css';
import Box from '@mui/material/Box';

const EducationHistory: React.FC<EducationHistoryProps> = ({
   id,
   deleteEducationHistoryElement,
   getUserInfoData,
}) => {
   const [educationInfo, setEducationInfo] = useState<UserEducationHistory>({
      id: id,
      studies: '',
      location: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: '',
   });
   
   const [isCollapsed, setIsCollapsed] = useState<boolean | undefined>(true);

   useEffect(() => {
      if (educationInfo.studies !== '' && educationInfo.location !== '' && educationInfo.institution !== ''
         && educationInfo.startDate !== '' && educationInfo.endDate !== '' && educationInfo.description) {
         getUserInfoData(educationInfo, "educationHistory")
      };
   }, [educationInfo]);

   const educationHistoryInputHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setEducationInfo({ ...educationInfo, [e.target.id]: e.target.value })
   };

   const toggleIsCollapsed = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setIsCollapsed(!isCollapsed);
   };

   return (
      <>
         <CollapsedComponent
            info={{ userEducationHistory: educationInfo }}
            setIsCollaped={setIsCollapsed}
            isCollapsed={isCollapsed}
            deleteElement={deleteEducationHistoryElement}
            id={id}
         />
         <Collapse
            sx={{
               mb: '20px'
            }}
            in={isCollapsed}>
            <div className={styles.topBlock}>
               <h3>Education history</h3>
               <Button onClick={() => deleteEducationHistoryElement(id)} color='error' variant='contained'>X</Button>
            </div>
            <button className={styles.collapseButton} onClick={toggleIsCollapsed}>HIDE</button>
            <Box
               sx={{
                  display: 'grid',
                  gridTemplateColumns: "repeat(2, 1fr)",
                  marginBottom: '10px'
               }}
            >
               <TextField
                  value={educationInfo.studies}
                  label="Studies"
                  onChange={educationHistoryInputHandler}
                  id="studies"
               />
               <TextField
                  value={educationInfo.location}
                  label="Location"
                  onChange={educationHistoryInputHandler}
                  id="location"
               />
               <TextField
                  value={educationInfo.institution}
                  label="Institution"
                  onChange={educationHistoryInputHandler}
                  id="institution"
               />
               <TextField
                  value={educationInfo.startDate}
                  label="Start date"
                  onChange={educationHistoryInputHandler}
                  id="startDate"
               />
               <TextField
                  value={educationInfo.endDate}
                  label="End date"
                  onChange={educationHistoryInputHandler}
                  id="endDate"
               />
            </Box>
            <p>Description</p>
            <TextareaAutosize
               className={styles.textarea}
               value={educationInfo.description}
               onChange={educationHistoryInputHandler}
               id="description"
            />
         </Collapse>
      </>
   );
};
export default React.memo(EducationHistory);