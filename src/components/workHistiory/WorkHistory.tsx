import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { WorkHistoryProps } from '../../types/types';
import { UserWorkHistory } from '../../types/types';
import styles from './workHistory.module.css';
import Collapse from '@mui/material/Collapse';
import CollapsedEducationHistory from '../CollapsedComponent/CollapsedComponent';
import CollapsedComponent from './../CollapsedComponent/CollapsedComponent';



const WorkHistory: React.FC<WorkHistoryProps> = ({
   id,
   getUserInfoData,
   deleteWorkHistoryElement,
}) => {
   const [workHistory, setWorkHistory] = useState<UserWorkHistory>({
      id: id,
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
   });
   const [isCollapsed, setIsCollapsed] = useState<boolean | undefined>(true);

   useEffect(() => {
      if (workHistory.position !== '' && workHistory.company !== '' && workHistory.startDate !== ''
         && workHistory.endDate !== '' && workHistory.description !== '') {
         getUserInfoData(workHistory, "workHistory")
      };
   }, [workHistory]);

   const wokHistoryInputHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setWorkHistory({ ...workHistory, [e.target.placeholder]: e.target.value })
   };

   const toggleIsCollapsed = () => {
      setIsCollapsed(!isCollapsed);
   };

   return (
      <>
         <CollapsedComponent
            info={{ userWorkHistory: workHistory }}
            setIsCollaped={setIsCollapsed}
            isCollapsed={isCollapsed}
            deleteElement={deleteWorkHistoryElement}
            id={id}
         />
         <Collapse in={isCollapsed}>
            <Button onClick={() => deleteWorkHistoryElement(id)} color='error' variant='contained'>X</Button>
            <button onClick={toggleIsCollapsed}>v</button>
            <h3>Work History</h3>
            <TextField
               onChange={wokHistoryInputHandler}
               label="position"
               value={workHistory.position}
               placeholder="position"
            />
            <TextField
               label="Company"
               onChange={wokHistoryInputHandler}
               value={workHistory.company}
               placeholder="company"
            />
            <TextField
               label="Start date"
               onChange={wokHistoryInputHandler}
               value={workHistory.startDate}
               placeholder="startDate"
            />
            <TextField
               label="End date"
               onChange={wokHistoryInputHandler}
               value={workHistory.endDate}
               placeholder="endDate"
            />
            <p>Description</p>
            <TextareaAutosize
               onChange={wokHistoryInputHandler}
               value={workHistory.description}
               placeholder="description"
            />
         </Collapse >
      </>
   );
};
export default WorkHistory;