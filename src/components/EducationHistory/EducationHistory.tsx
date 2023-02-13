import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { EducationHistoryProps, UserEducationHistory } from '../../types/types';
import Collapse from '@mui/material/Collapse';
import CollapsedEducationHistory from './../CollapsedComponent/CollapsedEducationHistory';

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
      setEducationInfo({ ...educationInfo, [e.target.placeholder]: e.target.value })
   };

   const toggleIsCollapsed = () => {
      setIsCollapsed(!isCollapsed);
   };

   return (
      <>
            <CollapsedEducationHistory
               info={educationInfo}
               setIsCollaped={setIsCollapsed}
               isCollapsed={isCollapsed}
               deleteElement={deleteEducationHistoryElement}
               id={id}
            />
            <Collapse in={isCollapsed}>
               <Button onClick={() => deleteEducationHistoryElement(id)} color='error' variant='contained'>X</Button>
               <button onClick={toggleIsCollapsed}>v</button>
               <TextField
                  value={educationInfo.studies}
                  label="Studies"
                  onChange={educationHistoryInputHandler}
                  placeholder="studies"
               />
               <TextField
                  value={educationInfo.location}
                  label="Location"
                  onChange={educationHistoryInputHandler}
                  placeholder="location"
               />
               <TextField
                  value={educationInfo.institution}
                  label="Institution"
                  onChange={educationHistoryInputHandler}
                  placeholder="institution"
               />
               <TextField
                  value={educationInfo.startDate}
                  label="Start date"
                  onChange={educationHistoryInputHandler}
                  placeholder="startDate"
               />
               <TextField
                  value={educationInfo.endDate}
                  label="End date"
                  onChange={educationHistoryInputHandler}
                  placeholder="endDate"
               />
               <p>Description</p>
               <TextareaAutosize
                  value={educationInfo.description}
                  onChange={educationHistoryInputHandler}
                  placeholder="description"
               />
            </Collapse>
         </>
         );
};
         export default EducationHistory;