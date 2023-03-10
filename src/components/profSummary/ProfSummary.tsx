import React, { useCallback, useMemo, useState } from "react";
import { ProfSummaryProps } from "../../types/types";
import styles from './profSummary.module.css';
import Box from '@mui/material/Box';
import SimpleMDE, { SimpleMdeReact } from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";


const ProfSummary: React.FC<ProfSummaryProps> = ({ setUserInfo, userInfo, profSummary }) => {

   return (
      <Box>
         <h3 className={styles.profSummaryTitle}>Information about you and your professional experience</h3>
         <textarea
            className={styles.textarea}
            value={profSummary}
            onChange={(e) => setUserInfo({ ...userInfo, profSummary: e.target.value })}
         />
         {/* <SimpleMdeReact value={value} onChange={onChange} /> */}
      </Box>
   );
};

export default ProfSummary;