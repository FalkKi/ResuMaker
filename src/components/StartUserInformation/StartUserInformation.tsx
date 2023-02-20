import React from "react";
import TextField from '@mui/material/TextField';
import { StartUserInfoProps } from "../../types/types";
import Box from '@mui/material/Box';
import styles from './startUserInformation.module.css';
import Grid from '@mui/material/Grid';
import { height } from "@mui/system";

const StartUserInfo: React.FC<StartUserInfoProps> = (props) => {
   return (
      <Box
         sx={{
            display: 'grid',
            gridTemplateColumns: "repeat(2, 1fr)",
         }}>

         <TextField
            required
            label="Job title"
            value={props.userInfo.jobTitle}
            onChange={props.eventHandler}
            placeholder='jobTitle' type='text'
         />
         <TextField
            required
            label="your name"
            value={props.userInfo.firstName}
            onChange={props.eventHandler}
            placeholder='firstName' type='text'
         />
         <TextField
            required
            label="your surname"
            value={props.userInfo.lastName}
            onChange={props.eventHandler}
            placeholder='lastName' type='text' />
         <TextField
            required
            label="email"
            value={props.userInfo.email}
            onChange={props.eventHandler}
            placeholder='email' type='text'
         />
         <TextField
            required
            label="date of birth"
            value={props.userInfo.birthDate}
            onChange={props.eventHandler}
            placeholder='birthDate' type='text'
         />
         <TextField
            required
            label="country"
            value={props.userInfo.country}
            onChange={props.eventHandler}
            placeholder='country'
            type='text'
         />

         <TextField
            required
            label="city"
            value={props.userInfo.city}
            onChange={props.eventHandler}
            placeholder='city'
            type='text' />
      </Box>
   );
};
export default StartUserInfo;