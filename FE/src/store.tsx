import { configureStore } from '@reduxjs/toolkit';
import authSlice from './components/Auth/AuthSlice';
import bookSlice from './features/posts/BookSlice';

export type RootState = ReturnType<typeof store.getState>


export const store = configureStore({
    reducer: {
        auth: authSlice,
        book: bookSlice
    }
})