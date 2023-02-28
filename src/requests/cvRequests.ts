import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./mainAxios";
import { User } from "../types/types";


export const fetchCVs = createAsyncThunk('makecv/fetchCVs', async () => {
      try {
            const { data } = await instance.get<User[]>('/makecv');
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



