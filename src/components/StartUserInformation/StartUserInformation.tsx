import React from "react";
import TextField from '@mui/material/TextField';
import { StartUserInfoProps } from "../../types/types";
import Box from '@mui/material/Box';
import styles from './startUserInformation.module.css';

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
            id='jobTitle' type='text'
         />
         <TextField
            required
            label="your name"
            value={props.userInfo.firstName}
            onChange={props.eventHandler}
            id='firstName' type='text'
         />
         <TextField
            required
            label="your surname"
            value={props.userInfo.lastName}
            onChange={props.eventHandler}
            id='lastName' type='text' />

         {props.isErrorEmail ? <TextField
            required
            label="email"
            value={props.userInfo.email}
            onChange={props.eventHandler}
            id='email' type='text'
            helperText='incorrect email'
            error={true}
         /> : <TextField
            required
            label="email"
            value={props.userInfo.email}
            onChange={props.eventHandler}
            id='email' type='text'
         />}

         <TextField
            required
            label="date of birth"
            value={props.userInfo.birthDate}
            onChange={props.eventHandler}
            id='birthDate' type='text'
         />
         <TextField
            required
            label="country"
            value={props.userInfo.country}
            onChange={props.eventHandler}
            id='country'
            type='text'
         />
         <TextField
            required
            label="city"
            value={props.userInfo.city}
            onChange={props.eventHandler}
            id='city'
            type='text' />
      </Box>
   );
};
export default StartUserInfo;