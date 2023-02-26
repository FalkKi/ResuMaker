import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "./mainAxios";
import { User } from "../types/types";


export const fetchCVs = createAsyncThunk('makecv/fetchCVs', async () => {

      const { data } = await instance.get<User[]>('/makecv');
      console.log(data)
      return data;

});

export const postCV = createAsyncThunk('makecv/postCV', async (info: User) => {
      const { data } = await instance.post<User>('/makecv', info);
      console.log(data)
      return data;
});



