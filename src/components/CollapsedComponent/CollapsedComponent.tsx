import React from "react";
import Button from '@mui/material/Button';
import styles from './collapsedComponent.module.css'
import Collapse from '@mui/material/Collapse';
import { Info } from '../../types/types';
import Box from '@mui/material/Box';
import { height } from "@mui/system";

const collapsedStyle = {
   display: 'flex',
   backgroundColor: '#1599C7',
   borderRadius: '4px',
   padding: '5px',
   height: '50px',
   juctifyContent: 'space-between',
}

const CollapsedComponent: React.FC<Info> = (props) => {
   return (
      <Box
         sx={{
            color: 'white',
            fontWeight: '700',
            textTransform: 'uppercase'
         }}
      >
         {props.info.userEducationHistory ?
            <Collapse
               in={!props.isCollapsed}>
               <Box sx={collapsedStyle}>
                  <div>
                     <h3 className={styles.collapseTitle}>{props.info.userEducationHistory.institution ?
                        props.info.userEducationHistory.institution : "Institution"}</h3>
                     <p>
                        {props.info.userEducationHistory.startDate ? props.info.userEducationHistory.startDate : " Start date "} -
                        {props.info.userEducationHistory.endDate ? props.info.userEducationHistory.endDate : " End date"}
                     </p>
                  </div>
                  <Box sx={{ margin: '0 0 0 auto' }}>
                     <Button sx={{ marginRight: '15px' }} onClick={() => props.deleteElement(props.id)} variant="contained" color='error'>Delete</Button>
                     <Button onClick={() => props.setIsCollaped(!props.isCollapsed)} variant="contained">Edit</Button>
                  </Box>
               </Box>
            </Collapse> : ''}
         {props.info.userWorkHistory ?
            <Collapse in={!props.isCollapsed}>
               <Box sx={collapsedStyle}>
                  <div>
                     <h3 className={styles.collapseTitle}>{props.info.userWorkHistory.position ?
                        props.info.userWorkHistory.position : "Position"}
                     </h3>
                     <p>
                        {props.info.userWorkHistory.startDate ? props.info.userWorkHistory.startDate : " Start date"} -
                        {props.info.userWorkHistory.endDate ? props.info.userWorkHistory.endDate : " End date"}
                     </p>
                  </div>
                  <Box sx={{ margin: '0 0 0 auto' }}>
                     <Button sx={{ marginRight: '15px' }} variant="contained" onClick={() => props.deleteElement(props.id)} color='error'>Delete</Button>
                     <Button variant="contained" onClick={() => props.setIsCollaped(!props.isCollapsed)}>Edit</Button>
                  </Box>
               </Box>
            </Collapse> : ''}

         {props.info.languageInfoType ?
            <Collapse in={!props.isCollapsed}>
               <Box sx={collapsedStyle}>
                  <div>
                     <span>{props.info.languageInfoType.languageName ?
                        props.info.languageInfoType.languageName : "Language"}
                     </span> -
                     <span>
                        {props.info.languageInfoType.level ? props.info.languageInfoType.level : " Level"}
                     </span>
                  </div>
                  <Box sx={{ margin: '0 0 0 auto' }}>
                     <Button sx={{ marginRight: '15px' }} variant="contained" onClick={() => props.deleteElement(props.id)} color='error'>Delete</Button>
                     <Button variant="contained" onClick={() => props.setIsCollaped(!props.isCollapsed)}>Edit</Button>
                  </Box>
               </Box>
            </Collapse> : ''}
         {props.info.userSkillType ? <Collapse in={!props.isCollapsed}>
            <Box sx={collapsedStyle}>
               <div>
                  <span>{props.info.userSkillType.skillName ?
                     props.info.userSkillType.skillName : "Skill"}
                  </span> -
                  <span>
                     {props.info.userSkillType.skillLevel ? props.info.userSkillType.skillLevel : " Level"}
                  </span>
               </div>
               <Box sx={{ margin: '0 0 0 auto' }}>
                  <Button sx={{ marginRight: '15px' }} variant="contained" onClick={() => props.deleteElement(props.id)} color='error'>Delete</Button>
                  <Button variant="contained" onClick={() => props.setIsCollaped(!props.isCollapsed)}>Edit</Button>
               </Box>
            </Box>
         </Collapse> : ''}
      </Box>
   );
};
export default CollapsedComponent;