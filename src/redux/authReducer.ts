import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAuth, fetchRegister } from '../requests/cvRequests';
import { fetchLogin } from './../requests/cvRequests';
import { initialStateType } from "./cvReducer";

type initialAuthType = {
   data: null | LoginActionPayloadType,
   status: string,
}
const initialState: initialAuthType = {
   data: null,
   status: 'loading',
};

type LoginActionPayloadType = {
   createdAt: string,
   updatedAt: string,
   email: string,
   _id: string,
   __v: string
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.data = null; 
      }
   },
   extraReducers: {
      [fetchRegister.pending.toString()]: (state) => {
         state.status = 'loading';
         state.data = null;
      },
      [fetchRegister.fulfilled.toString()]: (state, action: PayloadAction<LoginActionPayloadType>) => {
         console.log(action.payload, 'register')
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
      [fetchAuth.fulfilled.toString()]: (state, action: PayloadAction<LoginActionPayloadType>) => {
         console.log(action.payload, 'auth');
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
      [fetchLogin.fulfilled.toString()]: (state, action: PayloadAction<LoginActionPayloadType>) => {
         console.log(action.payload, 'login')
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