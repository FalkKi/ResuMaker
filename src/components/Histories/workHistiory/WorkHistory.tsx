import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { WorkHistoryProps } from '../../../types/types';
import { UserWorkHistory } from '../../../types/types';
import styles from '../histories.module.css';
import Collapse from '@mui/material/Collapse';
import CollapsedComponent from '../../CollapsedComponent/CollapsedComponent';
import Box from '@mui/material/Box';

const WorkHistory: React.FC<WorkHistoryProps> = ({
   id,
   getUserInfoData,
   deleteWorkHistoryElement,
   workData
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
      setWorkHistory({ ...workHistory, [e.target.id]: e.target.value });
   };

   const toggleIsCollapsed = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
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
         <Collapse
            sx={{
               mb: '20px'
            }}
            in={isCollapsed}>
            <div className={styles.topBlock}>
               <h3>Work History</h3>
               <Button onClick={() => deleteWorkHistoryElement(id)} color='error' variant='contained'>X</Button>
            </div>
            <button className={styles.collapseButton} onClick={toggleIsCollapsed}>HIDE</button>
            <Box
               sx={{
                  display: 'grid',
                  gridTemplateColumns: "repeat(2, 1fr)",
                  marginBottom: '10px'
               }}>
                  
               <TextField
                  onChange={wokHistoryInputHandler}
                  label="position"
                  value={workHistory.position}
                  id="position"
               />
               <TextField
                  label="Company"
                  onChange={wokHistoryInputHandler}
                  value={workHistory.company}
                  id="company"
               />
               <TextField
                  label="Start date"
                  onChange={wokHistoryInputHandler}
                  value={workHistory.startDate}
                  id="startDate"
               />
               <TextField
                  label="End date"
                  onChange={wokHistoryInputHandler}
                  value={workHistory.endDate}
                  id="endDate"
               />
            </Box>
            <p>Description</p>
            <textarea
               className={styles.textarea}
               onChange={wokHistoryInputHandler}
               value={workHistory.description}
               id="description"
            />
         </Collapse >
      </>
   );
};
export default React.memo(WorkHistory);