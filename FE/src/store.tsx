import { configureStore } from '@reduxjs/toolkit';
import authSlice from './components/Auth/AuthSlice';

export type RootState = ReturnType<typeof store.getState>


export const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})