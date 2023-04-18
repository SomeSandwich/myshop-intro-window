import { CaseReducer, PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Book } from '@/interfaces/bookDetail';
import {current } from '@reduxjs/toolkit'
import { BookSliceState } from '@/interfaces/stateBookSlice';
import { Category } from '@/interfaces/category';
import { getAllCate } from '@/services/categories.service';
export interface ICateState {
  listCate: Category[];
  isLoading: boolean;
  hasError : boolean;
  editCate: Category | null
}
const initialState: ICateState = {
  listCate: [],
  isLoading: false,
  hasError: false,
  editCate: null
};

export const getAllCategory = createAsyncThunk(
  "category",
  async (data, { dispatch, rejectWithValue }) => {
    try {
    //   dispatch(setLoading(true));
    console.log("Call Service")
      const response = await getAllCate();
    //   dispatch(setLoading(false));
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
const CateSlice = createSlice({
    name: 'cate',
    initialState:  initialState,
    reducers: {
        addCate:  (state, action) =>
        { 
          state.listCate.push(action.payload)
        },
        removeCate(state, action) {
            const removeCateID = action.payload;
            //axios xoa o server
            state.listCate.filter(cate=> cate.id !== removeCateID)
            console.log(state)
            // state = {...state,allBook:};
        },
        updateCate(state, action){
            const newCate = action.payload;
            const postIndex = state.listCate.findIndex(cate=> cate.id === newCate.Id)
            if(postIndex>=0){
              state.listCate[postIndex] = newCate;
            }
        },
        getCateById(state,action){
          const cateid = action.payload
          const indexOfCate = state.listCate.findIndex(cate=>cate.id==cateid);
          console.log(cateid)
          console.log(indexOfCate)
          state.editCate = state.listCate[indexOfCate]
        }
    },
    extraReducers: (builder) => {
      builder.addCase(
        getAllCategory.pending,
        (state, action) => {
            console.log("loading");
            state.isLoading = true;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllCategory.fulfilled,
        (state, action) => {
            console.log("done");
            state.listCate = action.payload
            state.isLoading = false;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllCategory.rejected,
        (state, action) => {
            console.log("reject");
            state.isLoading = false;
            state.hasError = true;
        }
      );
    }
});


const { actions, reducer } = CateSlice;
export const { addCate, removeCate,updateCate,getCateById} = actions;
export default reducer;