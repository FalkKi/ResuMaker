import React from "react";
import Button from '@mui/material/Button';
import styles from './collapsedComponent.module.css'
import { CollapsedWorkHistoryProps } from "../../types/types";
import Collapse from '@mui/material/Collapse';

const CollapsedWorkHistoryComponent: React.FC<CollapsedWorkHistoryProps> = (props) => {
   return (
      <Collapse in={!props.isCollapsed} className={styles.container}>
         <div>
            <h3>{props.info.position ? props.info.position : "Position"}</h3>
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
export default CollapsedWorkHistoryComponent;