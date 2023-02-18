import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageInfoType, UserEducationHistory, UserWorkHistory } from "../types/types";
import { fetchCVs } from './../requests/cvRequests';

type userInfoType = {
   imageUrl: string,
   birthDate: string,
   city: string,
   country: string,
   email: string,
   firstName: string,
   jobTitle: string,
   lastName: string,
   educationHistory: UserEducationHistory[],
   workHistory: UserWorkHistory[],
   languages: LanguageInfoType[],
   skills: [],
   profSummary: string,
};

type initialStateType = {
   cvInfo: {
      _id: string,
      status: string,
      userInfo: userInfoType,
      createdAt: string,
      updatedAt: string,
   };
};
const initialState: initialStateType = {
   cvInfo: {
      _id: '',
      status: 'loading',
      userInfo: {
         imageUrl: '',
         birthDate: '',
         city: '',
         country: '',
         email: '',
         firstName: '',
         jobTitle: '',
         lastName: '',
         educationHistory: [],
         workHistory: [],
         languages: [],
         skills: [],
         profSummary: '',
      },
      createdAt: '',
      updatedAt: '',
   }
};

const setCVs = createSlice({
   name: 'setCVs',
   initialState,
   reducers: {
   },
   extraReducers: {
      [fetchCVs.pending.toString()]: (state: initialStateType) => {
         state.cvInfo.status = 'loading';
      },
      [fetchCVs.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
         console.log(action)
         state.cvInfo = action.payload;
         state.cvInfo.status = 'loaded';
      },
      [fetchCVs.rejected.toString()]: (state: initialStateType) => {
         state.cvInfo.status = 'error';
      },
   }
});

export const cvReducer = setCVs.reducer; 