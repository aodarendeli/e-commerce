import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
const { request } = requestUtil();

const initialState = {
    loading: false,
    checkoutList: [],
    cityList: [],
    districtList: [],
    error: ''
}

export const fetchCheckoutList = createAsyncThunk(
    'checkout/fetchCheckoutList',
    async (id,payload) => {
        const response = await request.get(`/Order/GetPrepareOrder/${id}`, payload);
        return response.data;
    }
)  

export const fetchCityList = createAsyncThunk(
    'checkout/fetchCityList',
    async (payload) => {
        const response = await request.get(`/City`, payload);
        return response.data;
    }
) 

export const fetchDistrictList = createAsyncThunk(
    'checkout/fetchDistrictList',
    async (id,payload) => {
        const response = await request.get(`/District/${id}`, payload);
        return response.data;
    }
)

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchCheckoutList.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCheckoutList.fulfilled, (state, action) => {
            state.loading = false
            state.checkoutList = action.payload
            state.error = ''
        })
        builder.addCase(fetchCheckoutList.rejected, (state, action) => {
            state.loading = false
            state.checkoutList = []
            state.error = action.error.message
        })


        // -----------city list için
        builder.addCase(fetchCityList.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCityList.fulfilled, (state, action) => {
            state.loading = false
            state.cityList = action.payload
            state.error = ''
        })
        builder.addCase(fetchCityList.rejected, (state, action) => {
            state.loading = false
            state.cityList = []
            state.error = action.error.message
        })

           // -----------distrcit list için
           builder.addCase(fetchDistrictList.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchDistrictList.fulfilled, (state, action) => {
            state.loading = false
            state.districtList = action.payload
            state.error = ''
        })
        builder.addCase(fetchDistrictList.rejected, (state, action) => {
            state.loading = false
            state.districtList = []
            state.error = action.error.message
        })

    }
})

export const selectCheckoutList = state => state.checkout.checkoutList.data;
export const selectCityList = state => state.checkout.cityList.data
export const selectDistrictList = state => state.checkout.districtList.data

export default checkoutSlice.reducer;

