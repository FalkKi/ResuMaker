import { createSlice } from "@reduxjs/toolkit";
import { fetchAuth, fetchRegister } from '../requests/cvRequests';
import { fetchLogin } from './../requests/cvRequests';

const initialState = {
   data: null,
   status: 'loading',
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.data = null;   // тут можно мутировать
      }
   },
   extraReducers: {
      [fetchRegister.pending.toString()]: (state) => {
         state.status = 'loading';
         state.data = null;
      },
      [fetchRegister.fulfilled.toString()]: (state, action) => {
         state.status = 'loaded';
         state.data = action.payload;
      },
      [fetchRegister.rejected.toString()]: (state, action) => {
         state.status = 'error';
         state.data = null;
      },
      [fetchAuth.pending.toString()]: (state) => {
         state.status = 'loading';
         state.data = null;
      },
      [fetchAuth.fulfilled.toString()]: (state, action) => {
         state.status = 'loaded';
         state.data = action.payload;
      },
      [fetchAuth.rejected.toString()]: (state, action) => {
         state.status = 'error';
         state.data = null;
      },
      [fetchLogin.pending.toString()]: (state) => {
         state.status = 'loading';
         state.data = null;
      },
      [fetchLogin.fulfilled.toString()]: (state, action) => {
         console.log(action.payload, 'payload')
         state.status = 'loaded';
         state.data = action.payload;
      },
      [fetchLogin.rejected.toString()]: (state, action) => {
         state.status = 'error';
         state.data = null;
      },
   }
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;