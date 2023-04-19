import { CaseReducer, PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Book } from '@/interfaces/bookDetail';
import { current } from '@reduxjs/toolkit'
import { BookSliceState } from '@/interfaces/stateBookSlice';
import { DeleteBookService, addBookService, getAllBookService, updateBookService } from '@/services/book.service';
import { Genre } from '@/interfaces/Genre';
import { CategoryScale } from 'chart.js';
import { Category } from '@/interfaces/category';
import { arraysEqual } from '../Categories/CateSlice';
const numberPaging = 2;
export const getAllBookThunk = createAsyncThunk(
  "books",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      //   dispatch(setLoading(true));
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
  async (newBook: Book, { dispatch, rejectWithValue }) => {
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
  async (data: { id: string, newBook: Book }, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateBookService(data.id, data.newBook);
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
  async (id: string, { dispatch, rejectWithValue }) => {
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
  initialState: {
    listAllBook: [],
    listSearch: [],
    listFilter: [],
    listPaging: [],
    pageCurrent: 1,
    maxPage: 1,
    total: 0,
    sizeOfCurrentPage: 0,
    isLoading: false,
    hasError: false
  } as BookSliceState,
  reducers: {
    addBook: (state, action) => {
      state.listAllBook.push(action.payload)
    },
    removeBook(state, action) {
      const removeBookID = action.payload;
      //axios xoa o server
      state.listAllBook = state.listAllBook.filter(book => book.id !== removeBookID)
      // state = {...state,allBook:};
    },
    updateBook(state, action) {
      const newPost = action.payload;
      const postIndex = state.listAllBook.findIndex(book => book.id === newPost.Id)
      if (postIndex >= 0) {
        state.listAllBook[postIndex] = newPost;
      }
    },
    changePageBookFilter(state, action) {
      const page = action.payload;
      var start = 0
      var end = 0

      if (page < state.maxPage.valueOf()) {
        start = (page - 1) * numberPaging;
        end = (page - 1) * numberPaging + numberPaging;

      } else {
        start = (page - 1) * state.sizeOfCurrentPage.valueOf();
        end = (page - 1) * state.sizeOfCurrentPage.valueOf() + state.sizeOfCurrentPage.valueOf()
      }
      state.pageCurrent = page
      state.listPaging = state.listFilter.slice(start, end);
      state.sizeOfCurrentPage = state.listPaging.length
    },
    filterBookbyGenre(state, action: PayloadAction<Genre[]>) {
      const catelist = action.payload;
      const arrayfilter = state.listSearch.filter(book => book.categoryDescription == "")
      catelist.forEach(cate => {
        const subarr = state.listSearch.filter(book => book.categoryDescription == cate.value)
        subarr.forEach(book => arrayfilter.push(book))
      });

      state.listFilter = arrayfilter
      state.total = state.listFilter.length
      state.sizeOfCurrentPage = (state.listFilter.length > numberPaging) ? numberPaging : state.listFilter.length
      const size = state.sizeOfCurrentPage.valueOf()
      state.listPaging = state.listFilter.slice(0, size);
      if(size)
        state.maxPage = (state.listAllBook.length + numberPaging - 1) / size
      else 
        state.maxPage = 1
      console.log(state.listPaging)
      state.pageCurrent = 1;
    },
    filterBookbyCate(state, action: PayloadAction<Category[]>) {
      const catelist = action.payload;
      const arrayfilter = state.listSearch.filter(book => book.categoryDescription == "")
      catelist.forEach(cate => {
        const subarr = state.listSearch.filter(book => book.categoryDescription == cate.description)
        subarr.forEach(book => arrayfilter.push(book))
      });
      state.listFilter = arrayfilter
      state.total = state.listFilter.length
      state.sizeOfCurrentPage = (state.listFilter.length > numberPaging) ? numberPaging : state.listFilter.length
      const size = state.sizeOfCurrentPage.valueOf()
      state.listPaging = state.listFilter.slice(0, size);
      if(size)
        state.maxPage = (state.listAllBook.length + numberPaging - 1) / size
      else
        state.maxPage = 1
    }

  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllBookThunk.pending,
      (state, action) => {
        console.log("loading get all Books");
        state.isLoading = true;
        state.hasError = false;
      }
    );
    builder.addCase(
      getAllBookThunk.fulfilled,
      (state, action) => {
        console.log("get all Books done");
        if (arraysEqual(state.listAllBook, action.payload)) {
          console.log("Not Change")
        } else {
          state.listAllBook = action.payload
          state.listSearch = action.payload
          state.listFilter = action.payload
        }
        // state.total = state.listFilter.length
        // state.sizeOfCurrentPage = (state.listFilter.length>numberPaging)?numberPaging:state.listFilter.length
        // const size = state.sizeOfCurrentPage.valueOf()
        // state.listPaging = state.listFilter.slice(0,size);
        // state.maxPage = (state.listAllBook.length+numberPaging-1)/size
        // state.isLoading = false;
        // state.hasError = false;
      }
    );
    builder.addCase(
      getAllBookThunk.rejected,
      (state, action) => {
        console.log("get all book reject");
        state.isLoading = false;
        state.hasError = true;
      }
    );
    builder.addCase(
      DeleteBookThunk.fulfilled,
      (state, action) => {
        console.log("Delete Book Success")
      }
    );
    builder.addCase(
      AddBookThunk.fulfilled,
      (state, action) => {
        console.log("Add Book Success")
      }
    );
  }
});


const { actions, reducer } = BookSlice;
export const { addBook, removeBook, updateBook, changePageBookFilter, filterBookbyGenre, filterBookbyCate } = actions;
export default reducer;