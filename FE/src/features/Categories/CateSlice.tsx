import { CaseReducer, PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Book } from '@/interfaces/bookDetail';
import {current } from '@reduxjs/toolkit'
import { BookSliceState } from '@/interfaces/stateBookSlice';
import { Category } from '@/interfaces/category';
import { addCateService, DeleteCateThunkService, getAllCate, updateCateService } from '@/services/categories.service';
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
      alert(`Add new Category name "${description} success"`)
      dispatch(getAllCategoryThunk())
      return response;
    } catch (error: any) {
      alert(`Add new Category name "${description} Fail"`)
      return rejectWithValue(error);
    }
  }
);
export const UpdateCateThunk = createAsyncThunk(
  "category/updata",
  async (data :{id:string,description:string}, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateCateService(data.id,data.description);
      alert(`Update Category name "${data.description} success"`)
      dispatch(getAllCategoryThunk())
      return response;
    } catch (error: any) {
      alert(`Update new Category name "${data.description} Fail"`)
      return rejectWithValue(error);
    }
  }
);
export const DeleteCateThunk = createAsyncThunk(
  "category/delete",
  async (data : string, { dispatch, rejectWithValue }) => {
    try {
      const response = await DeleteCateThunkService(data);
      dispatch(getAllCategoryThunk())
      return {response,data};
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
            console.log("loading");
            state.isLoading = true;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllCategoryThunk.fulfilled,
        (state, action) => {
            console.log("Get all cate done");
            if(arraysEqual(state.listCate,action.payload))
            {
              console.log("Not Change")
            }
            else{
              console.log("Change")
              state.listCate = action.payload
            }
            state.isLoading = false;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllCategoryThunk.rejected,
        (state, action) => {
            console.log("reject");
            state.isLoading = false;
            state.hasError = true;
        }
      );
      builder.addCase(
        DeleteCateThunk.fulfilled,
        (state, action) => {
          console.log("Delete Success")
        }
      );
      builder.addCase(
        AddCateThunk.fulfilled,
        (state, action) => {
          console.log("Add Success")
        }
      );
    }
});


const { actions, reducer } = CateSlice;
export const { addCate,removeCate,updateCate,getCateById} = actions;
export default reducer;