import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

export interface Istudentdata {
  name: string;
  arr: (
    | {
        id: string;
        name: string;
      }
    | undefined
  )[];
}

function rootReducer(
  state: { studentdata: Istudentdata[] | null } = { studentdata: null },
  action: {
    type: string;
    data: Istudentdata[];
  }
) {
  switch (action.type) {
    case "getdata":
      return { studentdata: action.data };

    default:
      return state;
  }
}

export const toggleSlice = createSlice({
  name: "button",
  initialState: {
    value: true,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

const store = createStore(
  combineReducers({ rootReducer, login: toggleSlice.reducer }),
  applyMiddleware(thunk)
);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
