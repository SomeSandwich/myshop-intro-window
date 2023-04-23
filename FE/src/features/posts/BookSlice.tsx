import {
    CaseReducer,
    PayloadAction,
    SliceCaseReducers,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "@/interfaces/bookDetail";
import { current } from "@reduxjs/toolkit";
import { BookSliceState } from "@/interfaces/stateBookSlice";
import {
    DeleteBookService,
    addBookService,
    getAllBookService,
    searchBookService,
    updateBookService,
} from "@/services/book.service";
import { Genre } from "@/interfaces/Genre";
import { CategoryScale } from "chart.js";
import { Category } from "@/interfaces/category";
import { arraysEqual } from "../Categories/CateSlice";
const numberPaging = 9;
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
export const searchBookThunk = createAsyncThunk(
    "books/search",
    async (key: string, { dispatch, rejectWithValue }) => {
        try {
            //   dispatch(setLoading(true));
            const response = await searchBookService(key);
            //   dispatch(setLoading(false));
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);
export const AddBookThunk = createAsyncThunk(
    "books/add",
    async (newBook: FormData, { dispatch, rejectWithValue }) => {
        try {
            const response = await addBookService(newBook);
            dispatch(getAllBookThunk());
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);
export const UpdateBookThunk = createAsyncThunk(
    "books/updata",
    async (
        data: { id: string; newBook: Book },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const response = await updateBookService(data.id, data.newBook);
            alert(`Update Category name "${data.newBook.title} success"`);
            dispatch(getAllBookThunk());
            return response;
        } catch (error: any) {
            alert(`Update new Category name "${data.newBook.title} Fail"`);
            return rejectWithValue(error);
        }
    }
);
export const DeleteBookThunk = createAsyncThunk(
    "category/delete",
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await DeleteBookService(id);
            dispatch(getAllBookThunk());
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);
const BookSlice = createSlice({
    name: "books",
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
        hasError: false,
        isRefresh: false,
        currentGenre: [],
        currentPrice: 100000,
        currentCategory: [],
    } as BookSliceState,
    reducers: {
        addBook: (state, action) => {
            state.listAllBook.push(action.payload);
        },
        removeBook(state, action) {
            const removeBookID = action.payload;
            //axios xoa o server
            state.listAllBook = state.listAllBook.filter(
                (book) => book.id !== removeBookID
            );
            // state = {...state,allBook:};
        },
        updateBook(state, action) {
            const newPost = action.payload;
            const postIndex = state.listAllBook.findIndex(
                (book) => book.id === newPost.Id
            );
            if (postIndex >= 0) {
                state.listAllBook[postIndex] = newPost;
            }
        },
        refreshBook(state, action) {
            state.isRefresh = true;
            state.listSearch = state.listAllBook;
        },
        releaseRefreshBook(state, action) {
            state.isRefresh = false;
        },
        changePageBookFilter(state, action) {
            const page = action.payload;
            var start = 0;
            var end = 0;

            if (page < state.maxPage.valueOf()) {
                start = (page - 1) * numberPaging;
                end = (page - 1) * numberPaging + numberPaging;
            } else {
                start = (page - 1) * state.sizeOfCurrentPage.valueOf();
                end =
                    (page - 1) * state.sizeOfCurrentPage.valueOf() +
                    state.sizeOfCurrentPage.valueOf();
            }
            state.pageCurrent = page;
            state.listPaging = state.listFilter.slice(start, end);
            state.sizeOfCurrentPage = state.listPaging.length;
        },
        RefreshPrice(state, action) {
            state.currentPrice = 100000;
        },
        filterBookbyGenre(state, action: PayloadAction<Genre[]>) {
            state.currentGenre = action.payload;
            const genrelist = action.payload;
            const arrayfilter = state.listSearch.filter(
                (book) => book.categoryDescription == ""
            );
            genrelist.forEach((genre) => {
                const subarr = state.listSearch.filter(
                    (book) => book.categoryDescription == genre.value
                );
                subarr.forEach((book) => arrayfilter.push(book));
            });

            state.listFilter = arrayfilter;
            state.total = state.listFilter.length;
            state.sizeOfCurrentPage =
                state.listFilter.length > numberPaging
                    ? numberPaging
                    : state.listFilter.length;
            const size = state.sizeOfCurrentPage.valueOf();
            state.listPaging = state.listFilter.slice(0, size);
            if (size > 0) {
                state.maxPage = Math.ceil(
                    state.listFilter.length / numberPaging
                );
            } else {
                state.maxPage = 1;
            }
            // state.pageCurrent = 1;
        },
        filterBookbyCate(state, action: PayloadAction<Category[]>) {
            const catelist = action.payload;
            state.currentCategory = catelist;
            const arrayfilter = state.listSearch.filter(
                (book) => book.categoryDescription == ""
            );
            catelist.forEach((cate) => {
                const subarr = state.listSearch.filter(
                    (book) => book.categoryId == cate.id
                );
                subarr.forEach((book) => arrayfilter.push(book));
            });

            state.listFilter = arrayfilter;
            // state.currentPrice = 100000
            state.listFilter = state.listFilter.filter(
                (book) => book.price <= state.currentPrice
            );
            state.total = state.listFilter.length;
            state.sizeOfCurrentPage =
                state.listFilter.length > numberPaging
                    ? numberPaging
                    : state.listFilter.length;
            const size = state.sizeOfCurrentPage.valueOf();
            state.listPaging = state.listFilter.slice(0, size);
            if (size > 0) {
                state.maxPage = Math.ceil(
                    state.listFilter.length / numberPaging
                );
            } else state.maxPage = 1;

            // state.pageCurrent = 1;
        },
        filterCurrentBookbyPrice(state, action: PayloadAction<Number>) {
            const price = action.payload;
            state.listFilter = state.listFilter.filter(
                (book) => book.price < price
            );
            state.total = state.listFilter.length;
            state.sizeOfCurrentPage =
                state.listFilter.length > numberPaging
                    ? numberPaging
                    : state.listFilter.length;
            const size = state.sizeOfCurrentPage.valueOf();
            state.listPaging = state.listFilter.slice(0, size);
            if (size > 0) {
                state.maxPage = Math.ceil(
                    state.listFilter.length / numberPaging
                );
            } else state.maxPage = 1;

            // state.pageCurrent = 1;
        },
        filterCurrentBook(
            state,
            action: PayloadAction<{ genrelist: Genre[]; price: Number }>
        ) {
            const price = action.payload.price;
            const genrelist = action.payload.genrelist;
            state.currentPrice = price;
            const arrayfilter = state.listSearch.filter(
                (book) => book.categoryDescription == ""
            );
            if (genrelist.length == 0) {
                state.currentCategory.forEach((cate) => {
                    const subarr = state.listSearch.filter(
                        (book) => book.categoryId == cate.id
                    );
                    subarr.forEach((book) => arrayfilter.push(book));
                });
            } else {
                state.currentGenre = genrelist;
                genrelist.forEach((genre) => {
                    const subarr = state.listSearch.filter(
                        (book) => book.categoryDescription == genre.value
                    );
                    subarr.forEach((book) => arrayfilter.push(book));
                });
            }

            state.listFilter = arrayfilter;
            state.listFilter = state.listFilter.filter(
                (book) => book.price <= price
            );
            state.total = state.listFilter.length;
            state.sizeOfCurrentPage =
                state.listFilter.length > numberPaging
                    ? numberPaging
                    : state.listFilter.length;
            const size = state.sizeOfCurrentPage.valueOf();
            state.listPaging = state.listFilter.slice(0, size);
            if (size > 0) {
                state.maxPage = Math.ceil(
                    state.listFilter.length / numberPaging
                );
            } else state.maxPage = 1;

            // state.pageCurrent = 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBookThunk.pending, (state, action) => {
            console.log("loading get all Books");
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(getAllBookThunk.fulfilled, (state, action) => {
            console.log("get all Books done");
            if (arraysEqual(state.listAllBook, action.payload)) {
                console.log("Not Change");
            } else {
                state.listAllBook = action.payload;
                state.listSearch = action.payload;
                state.listFilter = action.payload;
            }
            // state.total = state.listFilter.length
            // state.sizeOfCurrentPage = (state.listFilter.length>numberPaging)?numberPaging:state.listFilter.length
            // const size = state.sizeOfCurrentPage.valueOf()
            // state.listPaging = state.listFilter.slice(0,size);
            // state.maxPage = (state.listAllBook.length+numberPaging-1)/size
            // state.isLoading = false;
            // state.hasError = false;
        });
        builder.addCase(getAllBookThunk.rejected, (state, action) => {
            console.log("get all book reject");
            state.isLoading = false;
            state.hasError = true;
        });
        builder.addCase(DeleteBookThunk.fulfilled, (state, action) => {
            console.log("Delete Book Success");
        });
        builder.addCase(AddBookThunk.fulfilled, (state, action) => {
            console.log("Add Book Success");
        });
        builder.addCase(searchBookThunk.fulfilled, (state, action) => {
            if (arraysEqual(state.listSearch, action.payload)) {
                console.log("Not Change");
            } else {
                console.log("search Book Success");
                state.listSearch = action.payload;
                state.isRefresh = true;
            }
        });
    },
});

const { actions, reducer } = BookSlice;
export const {
    addBook,
    removeBook,
    refreshBook,
    RefreshPrice,
    releaseRefreshBook,
    updateBook,
    changePageBookFilter,
    filterBookbyGenre,
    filterBookbyCate,
    filterCurrentBookbyPrice,
    filterCurrentBook,
} = actions;
export default reducer;
