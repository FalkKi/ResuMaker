import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from './mainAxios'
import { type User, type userRegisterType } from '../types/types'
import { type ActionPayloadType } from '../redux/cvReducer'

export const fetchCVs = createAsyncThunk('makecv/fetchCVs', async () => {
  try {
    const { data } = await instance.get<ActionPayloadType>('/makecv')
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    alert('Please check your intenet connection')
  };
})

export const fetchLastCvCurrentUser = createAsyncThunk('makecv/fetchCVs', async (id: string | undefined) => {
  console.log(id)
  try {
    const { data } = await instance.get<ActionPayloadType>(`/getUserLastCv/${id}`)
    if (!data) {
      return {
        imageUrl: '',
        jobTitle: '',
        firstName: '',
        lastName: '',
        profSummary: '',
        city: '',
        country: '',
        birthDate: '',
        email: '',
        workHistory: [],
        educationHistory: [],
        skills: [],
        languages: []
      }
    }
    return data
  } catch (err) {
    console.log(err)
    alert('Please check your intenet connection')
  };
})

export const postCV = createAsyncThunk('makecv/postCV', async (info: User) => {
  try {
    const { data } = await instance.post<User>('/makecv', info)
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    alert('Please check your intenet connection')
  }
})

export const updateCV = createAsyncThunk('makecv/updateCV', async (info: { id: string, data: unknown }) => {
  console.log(info)
  try {
    const { data } = await instance.patch<User>(`/makecv/${info.id}`, info.data)
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    alert('Please check your intenet connection')
  };
})

export const deleteCV = createAsyncThunk('makecv/deleteCV', async (id: string | undefined) => {
  console.log(id)
  try {
    const { data } = await instance.delete<User>(`/makecv/${id}`)
    return data
  } catch (err) {
    console.log(err)
    alert('Please check your intenet connection')
  };
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: userRegisterType) => {
  console.log(params)
  const { data } = await instance.post('/auth/register', params)
  return data
})

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params: userRegisterType) => {
  console.log(params)
  const { data } = await instance.post('/auth/login', params)
  return data
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {
  const { data } = await instance.get('/auth/me')
  return data
})

export const fetchCurrentCV = createAsyncThunk('makecv/getCurrentCv', async (id: string | undefined) => {
  try {
    const { data } = await instance.get<User>(`/makecv/${id}`)
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    alert('Please check your intenet connection')
  };
})
