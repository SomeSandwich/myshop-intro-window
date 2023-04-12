import { configureStore } from '@reduxjs/toolkit';
import authSlice from './components/Auth/AuthSlice';




export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
})