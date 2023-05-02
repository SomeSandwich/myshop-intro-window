import { CaseReducer, PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Book } from '@/interfaces/bookDetail';
import {current } from '@reduxjs/toolkit'
import { BookSliceState } from '@/interfaces/stateBookSlice';
import { Category } from '@/interfaces/category';
import { addCateService, DeleteCateThunkService, getAllCate, updateCateService } from '@/services/categories.service';
import { Notification, notification } from '@/components/Book/AddBook';
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
export function arraysEqual(a1:any,a2:any) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1)==JSON.stringify(a2);
}
export const getAllCategoryThunk = createAsyncThunk(
  "category",
  async (data, { dispatch, rejectWithValue }) => {
    try {
    //   dispatch(setLoading(true));
    const response = await getAllCate();
    //   dispatch(setLoading(false));
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const AddCateThunk = createAsyncThunk(
  "category/add",
  async (description : string, { dispatch, rejectWithValue }) => {
    try {
      const response = await addCateService(description);
      notification(`Add new Category name "${description}" Success`, Notification.Success)
      dispatch(getAllCategoryThunk())
      return response;
    } catch (error: any) {
      notification(`Add new Category name "${description}" Fail`, Notification.Success)
      return rejectWithValue(error);
    }
  }
);
export const UpdateCateThunk = createAsyncThunk(
  "category/updata",
  async (data :{id:string,description:string}, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateCateService(data.id,data.description);
      notification(`Update new Category name "${data.description}" Success`, Notification.Success)
      dispatch(getAllCategoryThunk())
      return response;
    } catch (error: any) {
      notification(`Update new Category name "${data.description}" Fail`, Notification.Error)
      return rejectWithValue(error);
    }
  }
);
export const DeleteCateThunk = createAsyncThunk(
  "category/delete",
  async (data : string, { dispatch, rejectWithValue }) => {
    try {
      const response = await DeleteCateThunkService(data);
      notification("Delete Success",Notification.Success)
      dispatch(getAllCategoryThunk())
      return {response,data};
    } catch (error: any) {
      notification(error.response.data.message,Notification.Error)
      
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
        removeCate(state, action){
          state.listCate = state.listCate.filter(cate=> cate.id.toString() !== action.payload)
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
          state.editCate = state.listCate[indexOfCate]
        }
    },
    extraReducers: (builder) => {
      builder.addCase(
        getAllCategoryThunk.pending,
        (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllCategoryThunk.fulfilled,
        (state, action) => {
            if(arraysEqual(state.listCate,action.payload))
            {
            }
            else{
              state.listCate = action.payload
            }
            state.isLoading = false;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllCategoryThunk.rejected,
        (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
      );
      builder.addCase(
        DeleteCateThunk.fulfilled,
        (state, action) => {
        }
      );
      builder.addCase(
        AddCateThunk.fulfilled,
        (state, action) => {
        }
      );
    }
});


const { actions, reducer } = CateSlice;
export const { addCate,removeCate,updateCate,getCateById} = actions;
export default reducer;