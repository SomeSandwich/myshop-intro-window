import { CaseReducer, PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Book } from '@/interfaces/bookDetail';
import {current } from '@reduxjs/toolkit'
import { BookSliceState } from '@/interfaces/stateBookSlice';
import { Category } from '@/interfaces/category';
const arr_test = [
  {
    Id:1,
    Description: "Fatasy",
  },
  {
    Id:2,
    Description: "Hornor",
  },
  {
    Id:3,
    Description: "Fairy Tale",
  },
  {
    Id:4,
    Description: "Cartoon",
  }
]
const CateSlice = createSlice({
    name: 'cate',
    initialState:  arr_test as Category[],
    reducers: {
        addBook:  (state, action) =>
        { 
          state.push(action.payload)
        },
        removeBook(state, action) {
            const removeCateID = action.payload;
            //axios xoa o server
            state = state.filter(cate=> cate.Id !== removeCateID)
            console.log(state)
            // state = {...state,allBook:};
        },
        updateBook(state, action){
            const newCate = action.payload;
            const postIndex = state.findIndex(cate=> cate.Id === newCate.Id)
            if(postIndex>=0){
              state[postIndex] = newCate;
            }
        },
    },
});


const { actions, reducer } = CateSlice;
export const { addBook, removeBook,updateBook,} = actions;
export default reducer;