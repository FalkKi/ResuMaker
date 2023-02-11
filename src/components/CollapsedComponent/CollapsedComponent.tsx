import React from "react";
import Button from '@mui/material/Button';
import styles from './collapsedComponent.module.css'

const CollapsedComponent: React.FC = () => {
   return (
      <div className={styles.container}>
         <div>
            <h3>Frontend</h3>
            <p>14.03.2009 - 15.08.2020</p>
         </div>
         <div>
            <Button color='error'>Delete</Button>
            <Button>Edit</Button>
         </div>
      </div>
   );
};
export default CollapsedComponent;