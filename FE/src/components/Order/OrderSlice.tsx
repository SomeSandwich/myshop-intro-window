import { CaseReducer, PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Book } from '@/interfaces/bookDetail';
import {current } from '@reduxjs/toolkit'
import { BookSliceState } from '@/interfaces/stateBookSlice';
import { Category } from '@/interfaces/category';
import { addCateService, DeleteCateThunkService, getAllCate, updateCateService } from '@/services/categories.service';
import { IOrderDetailProduct, Order, OrderDetail } from '@/interfaces/Order';
import { DeleteOrderService, addOrderService, getAllOrderService, updateOrderService } from '@/services/order.service';
import { arraysEqual } from '@/features/Categories/CateSlice';
export interface IOrderState {
  listOrder: Order[];
  isLoading: boolean;
  hasError : boolean;
  currentOrder: IOrderDetailProduct[]
}
const initialState: IOrderState = {
    listOrder: [],
    isLoading: false,
    hasError: false,
    currentOrder: []
};
export const getAllOrderThunk = createAsyncThunk(
  "order",
  async (data, { dispatch, rejectWithValue }) => {
    try {
    //   dispatch(setLoading(true));
    const response = await getAllOrderService();
    //   dispatch(setLoading(false));
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const AddOrderThunk = createAsyncThunk(
  "order/add",
  async (description : string, { dispatch, rejectWithValue }) => {
    try {
      const response = await addOrderService(new FormData());
      dispatch(getAllOrderThunk())
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const UpdateOrderThunk = createAsyncThunk(
  "order/updata",
  async (data :{id:string,description:string}, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateOrderService(data.id,data.description);
      dispatch(getAllOrderThunk())
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const DeleteOrderThunk = createAsyncThunk(
  "order/delete",
  async (data : string, { dispatch, rejectWithValue }) => {
    try {
      const response = await DeleteOrderService(data);
      dispatch(getAllOrderThunk())
      return {response,data};
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
const CateSlice = createSlice({
    name: 'order',
    initialState:  initialState,
    reducers: {
        addProductToCurrentOrder(state,action : PayloadAction<{id:Number,quantily:Number}>){
            state.currentOrder.push({productId: action.payload.id,quantity: action.payload.quantily})
        },
        removeProductToCurrentOrder(state,action : PayloadAction<{id:Number}>){
            state.currentOrder = state.currentOrder.filter(product=>product.productId!=action.payload.id)
        },
    },
    extraReducers: (builder) => {
      builder.addCase(
        getAllOrderThunk.pending,
        (state, action) => {
            console.log("loading");
            state.isLoading = true;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllOrderThunk.fulfilled,
        (state, action) => {
            console.log("Get all cate done");
            if(arraysEqual(state.listOrder,action.payload))
            {
              console.log("Not Change")
            }
            else{
              console.log("Change")
              state.listOrder = action.payload
            }
            state.isLoading = false;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllOrderThunk.rejected,
        (state, action) => {
            console.log("reject");
            state.isLoading = false;
            state.hasError = true;
        }
      );
      builder.addCase(
        DeleteOrderThunk.fulfilled,
        (state, action) => {
          console.log("Delete Success")
        }
      );
      builder.addCase(
        AddOrderThunk.fulfilled,
        (state, action) => {
          console.log("Add Success")
        }
      );
      builder.addCase(
        UpdateOrderThunk.fulfilled,
        (state, action) => {
          console.log("Update Success")
        }
      );
    }
});


const { actions, reducer } = CateSlice;
export const { addProductToCurrentOrder,removeProductToCurrentOrder} = actions;
export default reducer;