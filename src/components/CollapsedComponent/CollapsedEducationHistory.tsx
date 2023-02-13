import React from "react";
import Button from '@mui/material/Button';
import styles from './collapsedComponent.module.css'
import { CollapsedEducationHistoryProps } from "../../types/types";
import Collapse from '@mui/material/Collapse';

const CollapsedEducationHistory: React.FC<CollapsedEducationHistoryProps> = (props) => {
   return (
      <Collapse in={!props.isCollapsed} className={styles.container}>
         <div>
            <h3>{props.info.institution ? props.info.institution : "Institution"}</h3>
            <p>
               {props.info.startDate ? props.info.startDate : " Start date"} -
               {props.info.endDate ? props.info.endDate : " End date"}
            </p>
         </div>
         <div>
            <Button onClick={() => props.deleteElement(props.id)} color='error'>Delete</Button>
            <Button onClick={() => props.setIsCollaped(!props.isCollapsed)}>Edit</Button>
         </div>
      </Collapse>
   );
};
export default CollapsedEducationHistory;