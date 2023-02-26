import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User} from "../types/types";
import { fetchCVs } from './../requests/cvRequests';


type initialStateType = {
   cvInfo: {
      _id: string,
      status: string,
      userInfo: User,
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
         state.cvInfo = action.payload.at(-1); //here
         state.cvInfo.status = 'loaded'; 
      },
      [fetchCVs.rejected.toString()]: (state: initialStateType) => {
         state.cvInfo.status = 'error';
      },
   }
});

export const cvReducer = setCVs.reducer; 