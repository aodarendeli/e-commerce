import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
const { request } = requestUtil();


const initialState = {
    loading: false,
    orderList: [],
    // orderLength: 0,
    basketList: [],
    paymentList: [],
    error: ''
}

export const fecthOrderList = createAsyncThunk(
    'order/fecthOrderList',
    async (payload) => {
        const response = await request.post('/Order/Save', payload);
        return response.data;
    }
)

export const fetchbasketList = createAsyncThunk(
    'basket/fetchbasketList',
    async (id, payload) => {
        const response = await request.get(`/Basket?userId=${id}`, payload);
        // state.orderLength = response.data.data.orderModel.orderItemEntities.length
        return response.data;
    }
)

export const fetchpaymentList = createAsyncThunk(
    'order/paymentList',
    async (payload) => {
        const response = await request.post(`/Order/OrderComplete`, payload);
        return response.data;
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // orderLengthInfo(state, action) {
        //     state.orderLength = action.payload;
        // }
        reduceBasketQuantity: (state, action) => {
            for (let index = 0; index < state.basketList.data.orderModel.orderItemEntities.length; index++) {
                if (state.basketList.data.orderModel.orderItemEntities[index].orderItemEntity.productId == action.payload.value.orderItemEntity.productId) {
                    state.basketList.data.orderModel.orderItemEntities[index].orderItemEntity.quantity --;
                }
            }
        },
        increaseBasketQuantity: (state, action) => {
            for (let index = 0; index < state.basketList.data.orderModel.orderItemEntities.length; index++) {
                if (state.basketList.data.orderModel.orderItemEntities[index].orderItemEntity.productId == action.payload.value.orderItemEntity.productId) {
                    state.basketList.data.orderModel.orderItemEntities[index].orderItemEntity.quantity ++;
                }
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(fecthOrderList.pending, state => {
            state.loading = true
        })
        builder.addCase(fecthOrderList.fulfilled, (state, action) => {
            state.loading = false
            state.orderList = action.payload
            state.error = ''
        })
        builder.addCase(fecthOrderList.rejected, (state, action) => {
            state.loading = false
            state.orderList = []
            state.error = action.error.message
        })

        // ------------
        builder.addCase(fetchbasketList.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchbasketList.fulfilled, (state, action) => {
            state.loading = false
            state.basketList = action.payload
            state.error = ''
        })
        builder.addCase(fetchbasketList.rejected, (state, action) => {
            state.loading = false
            state.basketList = []
            state.error = action.error.message
        })

         // ------------
         builder.addCase(fetchpaymentList.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchpaymentList.fulfilled, (state, action) => {
            state.loading = false
            state.paymentList = action.payload
            state.error = ''
        })
        builder.addCase(fetchpaymentList.rejected, (state, action) => {
            state.loading = false
            state.paymentList = []
            state.error = action.error.message
        })
    }
})

export const selectOrderList = state => state.order.orderList.data;
export const selectBasketList = state => state.order.basketList.data;
export const selectPaymentList = state => state.order.paymentList.data;

// export const { orderLengthInfo } = orderSlice.actions;
export const { reduceBasketQuantity,increaseBasketQuantity } = orderSlice.actions;


export default orderSlice.reducer;

