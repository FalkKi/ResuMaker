import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserWorkHistory } from "../types/types";
import instance from "./mainAxios";

interface userCvs {
      _id: string,
      status: string,
      userInfo: object,
      workHistory: Array<UserWorkHistory>,
      profSummary: string,
      createdAt: string,
      updatedAt: string,
}

export const fetchCVs = createAsyncThunk('makecv/fetchCVs', async () => {
      const { data } = await instance.get<userCvs[]>('/makecv');
      console.log(data)
      return data;
});

export const postCV = createAsyncThunk('makecv/postCV', async (info: object) => {
      const { data } = await instance.post<userCvs>('/makecv', info);
      console.log(data)
      return data;
});



