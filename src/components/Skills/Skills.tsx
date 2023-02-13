import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styles from './skills.module.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SkillsHistoryProps, UserSkillType } from "../../types/types";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import CollapsedComponent from './../CollapsedComponent/CollapsedComponent';

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

   const toggleIsCollapsed = () => {
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
         <Collapse in={isCollapsed} className={styles.container}>
            <Button onClick={() => deleteSkillsHistoryElement(id)} color='error' variant='contained'>X</Button>
            <button onClick={toggleIsCollapsed}>v</button>
            <TextField
               fullWidth
               label="Skill"
               value={userSkills.skillName}
               onChange={(e) => setUserSkills({ ...userSkills, skillName: e.target.value })}
            />
            <Box sx={{ minWidth: 120 }}>
               <FormControl fullWidth>
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