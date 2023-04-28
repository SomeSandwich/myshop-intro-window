import { CaseReducer, PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Book } from '@/interfaces/bookDetail';
import {current } from '@reduxjs/toolkit'
import { BookSliceState } from '@/interfaces/stateBookSlice';
import { Category } from '@/interfaces/category';
import { addCateService, DeleteCateThunkService, getAllCate, updateCateService } from '@/services/categories.service';
import { IOrderDetailProduct, Order, OrderDetail, OrderDetailList, OutputOrderDetail } from '@/interfaces/Order';
import { DeleteOrderService, addOrderService, getAllOrderByUrlService, getAllOrderService, updateOrderService } from '@/services/order.service';
import { arraysEqual } from '@/features/Categories/CateSlice';
import { Notification, notification } from '../Book/AddBook';
export interface IOrderState {
  listOrder: OrderDetailList[];
  isLoading: boolean;
  hasError : boolean;
  currentOrder: IOrderDetailProduct[];
  totalPage :Number;
  urlPrePage: String;
  urlNextPage: String;
  currentPage: Number;
  urlCurrentPage: String
}
const initialState: IOrderState = {
    listOrder: [],
    isLoading: false,
    hasError: false,
    currentOrder: [],
    totalPage: 1,
    urlPrePage: "",
    urlNextPage: "",
    currentPage: 1,
    urlCurrentPage: ""
};
export const getAllOrderThunk = createAsyncThunk(
  "order",
  async (query :{
    CustomerId: Number | null,
    DateFrom: String | null,
    DateTo:String | null,
    PageNumber:Number| null,
    PageSize:Number| null}, { dispatch, rejectWithValue }) => {
    try {
      var PerareQuery =""
      if(query.CustomerId){
        PerareQuery+= `CustomerId=${query.CustomerId}&`
      }
      if(query.DateFrom){
        PerareQuery+= `DateFrom=${query.DateFrom}&`
      }
      if(query.DateTo){
        PerareQuery+= `DateTo=${query.DateTo}&`
      }
      if(query.PageNumber){
        PerareQuery+= `PageNumber=${query.PageNumber}&`
      }
      PerareQuery+= `PageSize=10`
    //   dispatch(setLoading(true));
    const response = await getAllOrderService(PerareQuery);
    //   dispatch(setLoading(false));
      return [response,"https://myshop.hieucckha.me/api/v1/order?"+PerareQuery];
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getAllOrderByUrlThunk = createAsyncThunk(
  "order/url",
  async (url:String, { dispatch, rejectWithValue }) => {
    try {
    //   dispatch(setLoading(true));
    const response = await getAllOrderByUrlService(url);
    //   dispatch(setLoading(false));
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const AddOrderThunk = createAsyncThunk(
  "order/add",
  async (data:{total: Number,customerId:Number,orderDetails:IOrderDetailProduct[]}, { dispatch, rejectWithValue }) => {
    try {
      const response = await addOrderService(data.total,data.customerId,data.orderDetails);
      notification("Create Order Success Fully",Notification.Success)
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const UpdateOrderThunk = createAsyncThunk(
  "order/updata",
  async (data :{id:string,newOrder:OutputOrderDetail}, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateOrderService(data.id,data.newOrder);
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
        addProductToCurrentOrder(state,action : PayloadAction<IOrderDetailProduct>){
            const title = action.payload.title?action.payload.title:""
            const indexDuplicate = state.currentOrder.findIndex(order=>order.productId==action.payload.productId)
            if(indexDuplicate>=0){
                state.currentOrder[indexDuplicate].quantity+=JSON.parse(JSON.stringify(action.payload.quantity))
            }
            else{
                state.currentOrder = [...state.currentOrder,({productId: action.payload.productId,quantity: action.payload.quantity,title})]
            }

            console.log(state.currentOrder)
        },
        resetProductinOrder(state,action){
          state.currentOrder = []
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
            if(arraysEqual(state.listOrder,action.payload))
            {
              console.log("Not Change")
            }
            else{
              console.log("Change")
              
              const DetailOrderPaging = action.payload[0]
              console.log(DetailOrderPaging)
              state.urlCurrentPage = action.payload[1]
              if(DetailOrderPaging.data.length > 0){
                
                if(!arraysEqual(DetailOrderPaging.data,state.listOrder)){
                  state.listOrder = DetailOrderPaging.data
                }
                state.urlNextPage=DetailOrderPaging.nextPage?DetailOrderPaging.nextPage:""
                state.urlPrePage=DetailOrderPaging.previousPage?DetailOrderPaging.previousPage:""
                state.totalPage = DetailOrderPaging.totalPages
                state.currentPage = DetailOrderPaging.pageNumber
              }else{
                state.listOrder =[]
                state.urlPrePage=""
                state.urlNextPage = ""
                state.totalPage=1
                state.currentPage=1
              }
            }
            state.isLoading = false;
            state.hasError = false;
        }
      );
      builder.addCase(
        getAllOrderByUrlThunk.fulfilled,
        (state, action) => {
            if(arraysEqual(state.listOrder,action.payload))
            {
              console.log("Not Change")
            }
            else{
              console.log("Change")
              const DetailOrderPaging = action.payload
              if(DetailOrderPaging.data.length > 0){
                if(!arraysEqual(DetailOrderPaging.data,state.listOrder)){
                  state.listOrder = DetailOrderPaging.data
                }
                state.urlNextPage=DetailOrderPaging.nextPage?DetailOrderPaging.nextPage:""
                state.urlPrePage=DetailOrderPaging.previousPage?DetailOrderPaging.previousPage:""
                state.totalPage = DetailOrderPaging.totalPages
                state.currentPage = DetailOrderPaging.pageNumber
              }else{
                state.listOrder =[]
                state.urlPrePage=""
                state.urlNextPage = ""
                state.totalPage=1
                state.currentPage=1
              }
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
export const { addProductToCurrentOrder,resetProductinOrder,removeProductToCurrentOrder} = actions;
export default reducer;