import { CaseReducer, PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Customer, InputCustomer } from '@/interfaces/Customer';
import { addCustomerService, getAllCustomerService } from '@/services/customer.service';
import { arraysEqual } from '@/features/Categories/CateSlice';
import { Notification, notification } from '../Book/AddBook';
export interface ICustomerState {
    listAllCustomer: Customer[];
    isLoading: boolean;
    hasError: boolean;
}
const initialState: ICustomerState = {
    listAllCustomer: [],
    isLoading: false,
    hasError: false,
};
export const getAllCustomerThunk = createAsyncThunk(
    "customer",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            //   dispatch(setLoading(true));
            const response = await getAllCustomerService();
            //   dispatch(setLoading(false));
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);
export const AddCustomerThunk = createAsyncThunk(
    "customer/add",
    async (customer: InputCustomer, { dispatch, rejectWithValue }) => {
        try {
            const response = await addCustomerService(customer);
            notification("Create New Customer Success", Notification.Success)
            dispatch(getAllCustomerThunk())
            return response;
        } catch (error: any) {
            if(error) notification(error.response.data.message, Notification.Error)
            return rejectWithValue(error);
        }
    }
);
const CustomerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(
            getAllCustomerThunk.pending,
            (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            }
        );
        builder.addCase(
            getAllCustomerThunk.fulfilled,
            (state, action) => {
                if (arraysEqual(state.listAllCustomer, action.payload)) {
                }
                else {
                    state.listAllCustomer = action.payload
                }
                state.isLoading = false;
                state.hasError = false;
            }
        );
        builder.addCase(
            getAllCustomerThunk.rejected,
            (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            }
        );
        builder.addCase(
            AddCustomerThunk.fulfilled,
            (state, action) => {
            }
        );
    }
});


const { actions, reducer } = CustomerSlice;
// export const { } = actions;
export default reducer;