import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SkillsHistoryProps, UserSkillType } from "../../../types/types";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import CollapsedComponent from '../../CollapsedComponent/CollapsedComponent';
import styles from '../histories.module.css';

const Skills: React.FC<SkillsHistoryProps> = ({
   id,
   deleteSkillsHistoryElement,
   getUserInfoData,
}) => {
   const [userSkills, setUserSkills] = useState<UserSkillType>({
      id: id,
      skillName: '',
      skillLevel: '',
   });
   const [isCollapsed, setIsCollapsed] = useState<boolean | undefined>(true);

   useEffect(() => {
      if (userSkills.skillName !== '' && userSkills.skillLevel !== '') {
         getUserInfoData(userSkills, "skills")
      };
   }, [userSkills]);

   const toggleIsCollapsed = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsCollapsed(!isCollapsed);
   };

   return (
      <>
         <CollapsedComponent
            info={{ userSkillType: userSkills }}
            setIsCollaped={setIsCollapsed}
            isCollapsed={isCollapsed}
            deleteElement={deleteSkillsHistoryElement}
            id={id}
         />
         <Collapse
            sx={{
               mb: '20px'
            }}
            in={isCollapsed}>
            <div className={styles.topBlock}>
               <h3>Skills</h3>
               <Button onClick={() => deleteSkillsHistoryElement(id)} color='error' variant='contained'>X</Button>
            </div>
            <button className={styles.collapseButton} onClick={toggleIsCollapsed}>Hide</button>
            <Box
               sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)'
               }}>
               <TextField
                  label="Skill"
                  value={userSkills.skillName}
                  onChange={(e) => setUserSkills({ ...userSkills, skillName: e.target.value })}
               />

               <FormControl sx={{ mt: '15px' }} fullWidth>
                  <InputLabel>Skill Level</InputLabel>
                  <Select
                     labelId="skillLevel"
                     value={userSkills.skillLevel}
                     onChange={(e: SelectChangeEvent) => { setUserSkills({ ...userSkills, skillLevel: e.target.value }) }}
                  >
                     <MenuItem value={"Student"}>Student</MenuItem>
                     <MenuItem value={"Basic skills"}>Basic skills</MenuItem>
                     <MenuItem value={"Medium"}>Medium</MenuItem>
                     <MenuItem value={"Professional"}>Professional</MenuItem>
                  </Select>
               </FormControl>
            </Box>
         </Collapse>
      </>
   )
}
export default Skills;