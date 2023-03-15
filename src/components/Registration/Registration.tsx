import React, { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "./registration.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { isValidEmail } from "../../utils/helpers";
import { isValidPassword } from './../../utils/helpers';
import { userRegisterType } from "../../types/types";
import { useAppSelector } from "../../redux/store";
import { useAppDispatch } from './../../redux/store';
import { fetchRegister } from './../../requests/cvRequests';
import { useNavigate } from 'react-router-dom';


const Registration = () => {
   const [regData, setRegData] = useState<userRegisterType>({
      email: '',
      password: '',
   });
   const dispatch = useAppDispatch();
   const isAuth = useAppSelector(state => state.auth.data);
   const isAuthStatus = useAppSelector(state => state.auth.status);
   const navigate = useNavigate();

   const [isErrorEmail, setError] = useState<string | null>(null);
   const [isErrorPassword, setErrorPassword] = useState<string | null>(null);

   const isRegistrationBtnDisabled = () => {
      if (regData.email !== '' && regData.password !== '') return false;
      return true;
   }

   const registerUser = async () => {
      isValidEmail(regData.email) ? setError(null) : setError('incorrect email');
      isValidPassword(regData.password) ? setErrorPassword(null) : setErrorPassword('password should contains at least 5 symbols')
      const registerData = await dispatch(fetchRegister(regData));
      console.log(registerData)
      if (!registerData.payload) {
         return alert('Registration failed');
      };
      if ('token' in registerData.payload) {
         window.localStorage.setItem('token', registerData.payload.token);
      };
      if (registerData.payload) {
         navigate('/');
      };
   };

   const handleRegisterData = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegData({ ...regData, [e.target.id]: e.target.value })
   };

   return (
      <Paper classes={{ root: styles.root }}>
         <Typography classes={{ root: styles.title }} variant="h5">
            Register your account
         </Typography>
         {isErrorEmail ? <TextField
            value={regData.email}
            className={styles.field}
            label='Email'
            type='email'
            fullWidth
            placeholder="email"
            id="email"
            onChange={handleRegisterData}
            helperText="incorrect email"
            error={true}
         /> : <TextField
            value={regData.email}
            className={styles.field}
            label='Email'
            type='email'
            fullWidth
            placeholder="email"
            id="email"
            onChange={handleRegisterData}
            error={false}
         />}
         {isErrorPassword ? <TextField
            value={regData.password}
            className={styles.field}
            label='Password'
            type='password'
            fullWidth
            placeholder="password"
            id="password"
            onChange={handleRegisterData}
            error={true}
            helperText={isErrorPassword}
         /> : <TextField
            value={regData.password}
            className={styles.field}
            label='Password'
            type='password'
            fullWidth
            placeholder="password"
            id="password"
            onChange={handleRegisterData}
         />}

         <Button disabled={isRegistrationBtnDisabled()} onClick={registerUser} size="large" variant="contained" fullWidth>
            Register
         </Button>

      </Paper>
   )
}
export default Registration;