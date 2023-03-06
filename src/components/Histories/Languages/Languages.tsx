import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LanguageHistoryProps, LanguageInfoType } from "../../../types/types";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import CollapsedComponent from '../../CollapsedComponent/CollapsedComponent';
import styles from '../histories.module.css';

const Languages: React.FC<LanguageHistoryProps> = ({
   id,
   deleteLanguageHistoryElement,
   getUserInfoData
}) => {

   const [languageInfo, setlanguageInfo] = useState<LanguageInfoType>({
      id: id,
      languageName: '',
      level: '',
   });

   const [isCollapsed, setIsCollapsed] = useState<boolean | undefined>(true);


   useEffect(() => {
      if (languageInfo.languageName !== '' && languageInfo.level !== '') {
         getUserInfoData(languageInfo, 'languages');
      };
   }, [languageInfo]);

   const toggleIsCollapsed = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsCollapsed(!isCollapsed);
   };
   
   return (
      <>
         <CollapsedComponent
            info={{ languageInfoType: languageInfo }}
            setIsCollaped={setIsCollapsed}
            isCollapsed={isCollapsed}
            deleteElement={deleteLanguageHistoryElement}
            id={id}
         />
         <Collapse
            sx={{
               mb: '20px'
            }}
            in={isCollapsed}>
            <div className={styles.topBlock}>
               <h3>Languages</h3>
               <Button onClick={() => deleteLanguageHistoryElement(id)} color='error' variant='contained'>X</Button>
            </div>
            <button className={styles.collapseButton} onClick={toggleIsCollapsed}>HIDE</button>
            <Box
               sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)'
               }}>

               <TextField
                  label="language"
                  value={languageInfo.languageName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setlanguageInfo({ ...languageInfo, languageName: e.target.value })}
               />
               <FormControl sx={{ mt: '15px' }} fullWidth>
                  <InputLabel>Skill Level</InputLabel>
                  <Select
                     labelId="demo-select-small"
                     label="Level"
                     placeholder="Level"
                     value={languageInfo.level}
                     onChange={(e: SelectChangeEvent) => { setlanguageInfo({ ...languageInfo, level: e.target.value }) }}
                  >
                     <MenuItem value={"Basic level"}>Basic level</MenuItem>
                     <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                     <MenuItem value={"Upper-Intemediate"}>Upper-Intemediate</MenuItem>
                     <MenuItem value={"Advanced"}>Advanced</MenuItem>
                     <MenuItem value={"Native speaker"}>Native speaker</MenuItem>
                  </Select>
               </FormControl>
            </Box>
         </Collapse>
      </>
   );
};

export default React.memo(Languages);