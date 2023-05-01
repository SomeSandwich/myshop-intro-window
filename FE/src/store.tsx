import { configureStore } from '@reduxjs/toolkit';
import authSlice from './components/Auth/AuthSlice';
import bookSlice from './features/posts/BookSlice';
import cateSlice from './features/Categories/CateSlice';
import orderSlice from './components/Order/OrderSlice'
import customerSlice from './components/Customer/CustomerSlice'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        auth: authSlice,
        book: bookSlice,
        cate: cateSlice,
        order: orderSlice,
        customer: customerSlice
    }
})