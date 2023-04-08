import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
const { request } = requestUtil();


const initialState = {
    loading: false,
    orderList: [],
    basketList: [],
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
    async (id,payload) => {
        console.log("payload",payload)
        const response = await request.get(`/Basket?userId=${id}`, payload);
        console.log("res",response)
        return response.data;
    }
)   

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
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
    }
})

export const selectOrderList = state => state.order.orderList.data;
export const selectBasketList = state => state.order.basketList.data;

export default orderSlice.reducer;

