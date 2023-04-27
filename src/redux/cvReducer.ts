import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type LanguageInfoType, type UserEducationHistory, type UserSkillType, type UserWorkHistory } from '../types/types'
import { fetchLastCvCurrentUser } from './../requests/cvRequests'

export interface initialStateType {
  cvInfo: {
    _id: string
    status: string
    imageUrl: string
    birthDate: string
    city: string
    country: string
    email: string
    firstName: string
    jobTitle: string
    lastName: string
    educationHistory: UserEducationHistory[]
    workHistory: UserWorkHistory[]
    languages: LanguageInfoType[]
    skills: UserSkillType[]
    profSummary: string
    createdAt: string
    updatedAt: string
  }
}

const initialState: initialStateType = {
  cvInfo: {
    _id: '',
    status: 'loading',
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
    createdAt: '',
    updatedAt: ''
  }
}

export interface ActionPayloadType {
  status: string
  _id: string
  userId: string
  _v: number
  imageUrl: string
  birthDate: string
  city: string
  country: string
  email: string
  firstName: string
  jobTitle: string
  lastName: string
  educationHistory: UserEducationHistory[]
  workHistory: UserWorkHistory[]
  languages: LanguageInfoType[]
  skills: UserSkillType[]
  profSummary: string
  createdAt: string
  updatedAt: string
}

const setCVs = createSlice({
  name: 'setCVs',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLastCvCurrentUser.pending.toString(), (state: initialStateType) => {
      state.cvInfo.status = 'loading'
    })
    builder.addCase(fetchLastCvCurrentUser.fulfilled.toString(), (state: initialStateType, action: PayloadAction<ActionPayloadType>) => {
      console.log(action.payload)
      if (action.payload) {
        state.cvInfo = action.payload
        state.cvInfo.status = 'loaded'
      }
      if (!action.payload) {
        state.cvInfo = {
          _id: '',
          status: '',
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
          createdAt: '',
          updatedAt: ''
        }
        state.cvInfo.status = 'loading'
      };
    })
    builder.addCase(fetchLastCvCurrentUser.rejected.toString(), (state: initialStateType) => {
      state.cvInfo.status = 'error'
    })
  }
})

export const cvReducer = setCVs.reducer
