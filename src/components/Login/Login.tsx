import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "./login.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Resolver } from "react-hook-form";
import { FormValues } from "../../types/types";
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { fetchAuth } from "../../requests/cvRequests";
import { useNavigate } from 'react-router-dom';
import { useInput } from './../../hooks/validation';

const Login = () => {

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const email = useInput('', { isEmpty: true, minLength: 5, maxLenght: 15, isEmail: false, inputValid: false});
   const password = useInput('', { isEmpty: true, minLength: 5, maxLength: 15, isEmail: false, inputValid: false});

   const onSubmit = async (e: any) => {
      e.preventDefault()
      const loginInfo = await dispatch(fetchAuth({ email: email.value, password: password.value }))
      if (!loginInfo.payload) {
         return alert('Authorization failed');
      };
      if ('token' in loginInfo.payload) {
         window.localStorage.setItem('token', loginInfo.payload.token);
      };
      if (loginInfo.payload) {
         navigate('/');
      };
   };

   return (
      <Paper classes={{ root: styles.root }}>
         <Typography classes={{ root: styles.title }} variant="h5">
            Enter your account
         </Typography>
         <form onSubmit={onSubmit}>

            <TextField
               className={styles.field}
               label='Email'
               type='email'
               fullWidth
               placeholder="email"
               value={email.value}
               onChange={e => email.onChange(e)}
               onBlur={e => email.onBlur(e)}
            />
            {(email.dirty && email.isEmpty) && <div style={{ color: 'red' }}>Field can't be empty</div>}
            {(email.dirty && email.minLengthError) && <div style={{ color: 'red' }}>Incorrect length</div>}
            {(email.dirty && email.isEmailError) && <div style={{ color: 'red' }}>Incorrect email</div>}
            <TextField
               className={styles.field}
               label='Password'
               type='password'
               fullWidth
               placeholder="password"
               value={password.value}
               onChange={e => password.onChange(e)}
               onBlur={e => password.onBlur(e)}
            />
            {(password.dirty && password.isEmpty) && <div style={{ color: 'red' }}>Field can't be empty</div>}
            {(password.dirty && password.minLengthError) && <div style={{ color: 'red' }}>Incorrect length</div>}
            {(password.dirty && password.maxLengthError) && <div style={{ color: 'red' }}>Incorrect length</div>}
            <Button disabled={!email.inputValid || !password.inputValid} type="submit" size="large" variant="contained" fullWidth>
               Enter
            </Button>
         </form>
      </Paper>
   );
}
export default Login;