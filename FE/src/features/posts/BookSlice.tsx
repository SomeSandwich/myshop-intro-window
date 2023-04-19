import { CaseReducer, PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Book } from '@/interfaces/bookDetail';
import {current } from '@reduxjs/toolkit'
import { BookSliceState } from '@/interfaces/stateBookSlice';
import { DeleteBookService, addBookService, getAllBookService, updateBookService } from '@/services/book.service';
export const getAllBookThunk = createAsyncThunk(
  "books",
  async (data, { dispatch, rejectWithValue }) => {
    try {
    //   dispatch(setLoading(true));
    console.log("Call Service")
    const response = await getAllBookService();
    //   dispatch(setLoading(false));
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const AddBookThunk = createAsyncThunk(
  "books/add",
  async (newBook : Book, { dispatch, rejectWithValue }) => {
    try {
      const response = await addBookService(newBook);
      alert(`Add new Category name "${newBook.title} success"`)
      dispatch(getAllBookThunk())
      return response;
    } catch (error: any) {
      alert(`Add new Category name "${newBook.title} Fail"`)
      return rejectWithValue(error);
    }
  }
);
export const UpdateBookThunk = createAsyncThunk(
  "books/updata",
  async (data :{id:string,newBook:Book}, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateBookService(data.id,data.newBook);
      alert(`Update Category name "${data.newBook.title} success"`)
      dispatch(getAllBookThunk())
      return response;
    } catch (error: any) {
      alert(`Update new Category name "${data.newBook.title} Fail"`)
      return rejectWithValue(error);
    }
  }
);
export const DeleteBookThunk = createAsyncThunk(
  "category/delete",
  async (id : string, { dispatch, rejectWithValue }) => {
    try {
      const response = await DeleteBookService(id);
      dispatch(getAllBookThunk())
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
const BookSlice = createSlice({
    name: 'books',
    initialState:  {
        listAllBook: [],
        listSearch: [],
        listFilter: [],
        listPaging: [],
        pageCurrent: 1,
        maxPage: 1,
        total:0,
        sizeOfCurrentPage: 0,
        isLoading: false,
        hasError: false
    } as BookSliceState,
    reducers: {
        addBook:  (state, action) =>
        { 
          state.listAllBook.push(action.payload)
        },
        removeBook(state, action) {
            const removeBookID = action.payload;
            //axios xoa o server
            state.listAllBook = state.listAllBook.filter(book=> book.id !== removeBookID)
            console.log(state.listAllBook)
            // state = {...state,allBook:};
        },
        updateBook(state, action){
            const newPost=action.payload;
            const postIndex = state.listAllBook.findIndex(book=> book.id===newPost.Id)
            if(postIndex>=0){
              state.listAllBook[postIndex] = newPost;
            }
        }
    },
    extraReducers: (builder) => {
      builder.addCase(
        getAllBookThunk.pending,
        (state, action) => {
            console.log("loading");
            state.isLoading = true;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllBookThunk.fulfilled,
        (state, action) => {
            console.log("done");
            state.listAllBook = action.payload
            state.listSearch = action.payload
            state.listFilter = action.payload
            state.total = state.listFilter.length
            state.sizeOfCurrentPage = state.listFilter.length>8?8:state.listFilter.length
            const size = state.sizeOfCurrentPage.valueOf()
            state.listPaging = state.listFilter.slice(0,size);
            state.maxPage = (state.listAllBook.length+7)/size
            state.isLoading = false;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllBookThunk.rejected,
        (state, action) => {
            console.log("reject");
            state.isLoading = false;
            state.hasError = true;
        }
      );
      builder.addCase(
        DeleteBookThunk.fulfilled,
        (state, action) => {
          console.log("Delete Success")
        }
      );
      builder.addCase(
        AddBookThunk.fulfilled,
        (state, action) => {
          console.log("Add Success")
        }
      );
    }
});


const { actions, reducer } = BookSlice;
export const { addBook, removeBook,updateBook,} = actions;
export default reducer;