import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageInfoType, User, UserEducationHistory, UserSkillType, UserWorkHistory } from "../types/types";
import { fetchCVs } from './../requests/cvRequests';


export type initialStateType = {
   cvInfo: {
      _id: string,
      status: string,
      userInfo: User,
      createdAt: string,
      updatedAt: string,
   }
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

export type ActionPayloadType = {
   status: string,
   _id: string,
   _v: number,
   userInfo: User,
   createdAt: string,
   updatedAt: string,
}

const setCVs = createSlice({
   name: 'setCVs',
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      builder.addCase(fetchCVs.pending.toString(), (state: initialStateType) => {
         state.cvInfo.status = 'loading';
      });
      builder.addCase(fetchCVs.fulfilled.toString(), (state: initialStateType, action: PayloadAction<ActionPayloadType[]>) => {
         if (action.payload && action.payload.length > 0) {
            state.cvInfo = action.payload[action.payload.length - 1];
            state.cvInfo.status = 'loaded';
         }
         if (!action.payload || action.payload.length === 0) {
            state.cvInfo = {
               _id: '',
               status: '',
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
            state.cvInfo.status = 'loading';
         };
      });
      builder.addCase(fetchCVs.rejected.toString(), (state: initialStateType) => {
         state.cvInfo.status = 'error';
      });
   }
});

export const cvReducer = setCVs.reducer; 