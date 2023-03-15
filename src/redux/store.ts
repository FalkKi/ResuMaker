import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { authReducer } from "./authReducer";
import { cvReducer } from "./cvReducer";

export const store = configureStore({
   reducer: {
      setCVs: cvReducer,
      auth: authReducer,
   }
});


export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => RootDispatch = useDispatch;
