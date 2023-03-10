import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "./login.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Resolver } from "react-hook-form";

type FormValues = {
   email: string;
   password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
   return {
      values: values.email ? values : {},
      errors: !values.email
         ? {
            email: {
               type: 'required',
               message: 'email is required.',
            },
            password: {
               type: 'required',
               message: 'password is required.',
            },
         }
         : {},
   };
};

export default function Login() {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({ resolver });
   const onSubmit = handleSubmit((data) => console.log(data));

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

            <Button type="submit" size="large" variant="contained" fullWidth>
               Войти
            </Button>
         </form>
      </Paper>
   );
}