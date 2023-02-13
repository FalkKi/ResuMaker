import React from "react";
import TextField from '@mui/material/TextField';
import { StartUserInfoProps } from "../../types/types";

const StartUserInfo: React.FC<StartUserInfoProps> = (props) => {
   return (
      <div >
         <TextField
            label="Job title"
            value={props.userInfo.jobTitle}
            onChange={props.eventHandler}
            placeholder='jobTitle' type='text' />
         <TextField
            label="your name"
            value={props.userInfo.firstName}
            onChange={props.eventHandler}
            placeholder='firstName' type='text' />
         <TextField
            label="your surname"
            value={props.userInfo.lastName}
            onChange={props.eventHandler}
            placeholder='lastName' type='text' />
         <TextField
            label="email"
            value={props.userInfo.email}
            onChange={props.eventHandler}
            placeholder='email' type='text' />
         <TextField
            label="date of birth"
            value={props.userInfo.birthDate}
            onChange={props.eventHandler}
            placeholder='birthDate' type='text' />
         <TextField
            label="country"
            value={props.userInfo.country}
            onChange={props.eventHandler}
            placeholder='country' type='text' />
         <TextField
            label="city"
            value={props.userInfo.city}
            onChange={props.eventHandler}
            placeholder='city' type='text' />
      </div>
   );
};
export default StartUserInfo;