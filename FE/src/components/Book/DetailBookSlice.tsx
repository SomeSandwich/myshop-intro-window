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
