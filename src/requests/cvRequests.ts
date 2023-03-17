import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./mainAxios";
import { User, userRegisterType } from "../types/types";
import { ActionPayloadType } from "../redux/cvReducer";


export const fetchCVs = createAsyncThunk('makecv/fetchCVs', async () => {
      try {
            const { data } = await instance.get<ActionPayloadType[]>('/makecv');
            console.log(data)
            return data;
      } catch (err) {
            console.log(err)
            alert('Please check your intenet connection')
      };
});

export const postCV = createAsyncThunk('makecv/postCV', async (info: User) => {
      try {
            const { data } = await instance.post<User>('/makecv', info);
            console.log(data)
            return data;
      } catch (err) {
            console.log(err)
            alert('Please check your intenet connection')
      }
});

export const updateCV = createAsyncThunk('makecv/updateCV', async (id: string | undefined, info: any) => {
      console.log(info, id)
      try {
            const { data } = await instance.patch<User>(`/makecv/${id}`, info);
            console.log(data)
            return data;
      } catch (err) {
            console.log(err)
            alert('Please check your intenet connection')
      }
});

export const deleteCV = createAsyncThunk('makecv/deleteCV', async (id: string | undefined) => {
      console.log(id)
      try {
            const { data } = await instance.delete<User>(`/makecv/${id}`);
            return data;
      } catch (err) {
            console.log(err)
            alert('Please check your intenet connection')
      };
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: userRegisterType) => {
      console.log(params)
      const { data } = await instance.post('/auth/register', params);
      return data;
});

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params: userRegisterType) => {
      const { data } = await instance.post('/auth/login', params);
      return data;
});

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {
      const { data } = await instance.get('/auth/me');
      return data;
   });