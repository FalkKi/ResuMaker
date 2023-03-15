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

const resolver: Resolver<FormValues> = async (values) => {
   return {
      values: values.email ? values : values.password ? values : {},
      errors: !values.email ? {
         email: {
            type: 'required',
            message: 'email is required.',
         },
         password: {
            type: 'required',
            message: 'password is required.',
         },
      }
         : !values.password ? {
            password: {
               type: 'required',
               message: 'password is required.',
            },
         } : {}
   };
};

const Login = () => {
   const dispatch = useAppDispatch();
   const isAuth = useAppSelector(state => state.auth.data);
   const navigate = useNavigate();
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({ resolver });

   const onSubmit = handleSubmit(async (data) => {
      const loginInfo = await dispatch(fetchAuth(data))
      console.log(loginInfo)
      if (!loginInfo.payload) {
         return alert('Authorization failed');
      };
      if ('token' in loginInfo.payload) {
         window.localStorage.setItem('token', loginInfo.payload.token);
      };
      if (loginInfo.payload) {
         navigate('/');
      };
   });

   return (

      <Paper classes={{ root: styles.root }}>
         <Typography classes={{ root: styles.title }} variant="h5">
            Enter your account
         </Typography>
         <form onSubmit={onSubmit}>

            {errors.email ? <TextField
               className={styles.field}
               label='Email'
               type='email'
               fullWidth
               {...register('email', { required: 'enter email' })}
               placeholder="email"
               error={Boolean(errors.email.message)}
               helperText={errors.email.message}
            /> : <TextField
               className={styles.field}
               label='Email'
               type='email'
               fullWidth
               {...register('email', { required: 'enter email' })}
               placeholder="email"
            />}

            {errors.password ? <TextField
               className={styles.field}
               label='Password'
               type='password'
               fullWidth
               {...register('password', { required: 'enter password' })}
               placeholder="password"
               error={Boolean(errors.password.message)}
               helperText={errors.password.message}
            /> : <TextField
               className={styles.field}
               label='Password'
               type='password'
               fullWidth
               {...register('password', { required: 'enter password' })}
               placeholder="password"
            />}

            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
               Enter
            </Button>
         </form>
      </Paper>
   );
}
export default Login;