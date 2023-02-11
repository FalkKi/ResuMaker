import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { EducationHistoryProps, UserEducationHistory } from '../../types/types';


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
   console.log('educationHistory render');
   useEffect(() => {
      if (educationInfo.studies !== '' && educationInfo.location !== '' && educationInfo.institution !== ''
         && educationInfo.startDate !== '' && educationInfo.endDate !== '' && educationInfo.description) {
            getUserInfoData(educationInfo, "educationHistory")
      };
   }, [educationInfo]);

   const educationHistoryInputHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setEducationInfo({ ...educationInfo, [e.target.placeholder]: e.target.value })
   };

   return (
      <div>
         <Button onClick={() => deleteEducationHistoryElement(id)} color='error' variant='contained'>X</Button>
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
      </div>
   );
};
export default EducationHistory;