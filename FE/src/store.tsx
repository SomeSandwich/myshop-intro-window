import { configureStore } from '@reduxjs/toolkit';
import authSlice from './components/Auth/AuthSlice';
import bookSlice from './features/posts/BookSlice';
import cateSlice from './features/Categories/CateSlice';

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        auth: authSlice,
        book: bookSlice,
        cate: cateSlice
    }
})