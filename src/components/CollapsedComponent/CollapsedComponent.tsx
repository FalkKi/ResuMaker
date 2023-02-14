import React from "react";
import Button from '@mui/material/Button';
import styles from './collapsedComponent.module.css'
import Collapse from '@mui/material/Collapse';
import { Info } from '../../types/types';

const CollapsedComponent: React.FC<Info> = (props) => {
   return (
      <>
         {props.info.userEducationHistory ?
            <Collapse in={!props.isCollapsed} className={styles.container}>

               <div>
                  <h3>{props.info.userEducationHistory.institution ?
                     props.info.userEducationHistory.institution : "Institution"}</h3>
                  <p>
                     {props.info.userEducationHistory.startDate ? props.info.userEducationHistory.startDate : " Start date"} -
                     {props.info.userEducationHistory.endDate ? props.info.userEducationHistory.endDate : " End date"}
                  </p>
               </div>
               <div>
                  <Button onClick={() => props.deleteElement(props.id)} color='error'>Delete</Button>
                  <Button onClick={() => props.setIsCollaped(!props.isCollapsed)}>Edit</Button>
               </div>
            </Collapse> : ''}
         {props.info.userWorkHistory ?
            <Collapse in={!props.isCollapsed} className={styles.container}>

               <div>
                  <h3>{props.info.userWorkHistory.position ?
                     props.info.userWorkHistory.position : "Position"}</h3>
                  <p>
                     {props.info.userWorkHistory.startDate ? props.info.userWorkHistory.startDate : " Start date"} -
                     {props.info.userWorkHistory.endDate ? props.info.userWorkHistory.endDate : " End date"}
                  </p>
               </div>
               <div>
                  <Button onClick={() => props.deleteElement(props.id)} color='error'>Delete</Button>
                  <Button onClick={() => props.setIsCollaped(!props.isCollapsed)}>Edit</Button>
               </div>
            </Collapse> : ''}

         {props.info.languageInfoType ?
            <Collapse in={!props.isCollapsed} className={styles.container}>
               <div>
                  <span>{props.info.languageInfoType.languageName ?
                     props.info.languageInfoType.languageName : "Language"}
                  </span> -
                  <span>
                     {props.info.languageInfoType.level ? props.info.languageInfoType.level : " Level"}
                  </span>
               </div>
               <div>
                  <Button onClick={() => props.deleteElement(props.id)} color='error'>Delete</Button>
                  <Button onClick={() => props.setIsCollaped(!props.isCollapsed)}>Edit</Button>
               </div>
            </Collapse> : ''}
         {props.info.userSkillType ? <Collapse in={!props.isCollapsed} className={styles.container}>
            <div>
               <span>{props.info.userSkillType.skillName ?
                  props.info.userSkillType.skillName : "Skill"}
               </span> -
               <span>
                  {props.info.userSkillType.skillLevel ? props.info.userSkillType.skillLevel : " Level"}
               </span>
            </div>
            <div>
               <Button onClick={() => props.deleteElement(props.id)} color='error'>Delete</Button>
               <Button onClick={() => props.setIsCollaped(!props.isCollapsed)}>Edit</Button>
            </div>
         </Collapse> : ''}
      </>
   );
};
export default CollapsedComponent;