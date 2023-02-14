import React from "react";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { ProfSummaryProps } from "../../types/types";
import styles from './profSummary.module.css';

const ProfSummary: React.FC<ProfSummaryProps> = ({ setUserInfo, userInfo, profSummary }) => {

   return (
      <div>
         <h3>Profile</h3>
         <div>Write some information about you</div>
         <TextareaAutosize
            className={styles.textarea}
            value={profSummary}
            onChange={(e) => setUserInfo({ ...userInfo, profSummary: e.target.value })}
         />
      </div>
   );
};

export default ProfSummary;