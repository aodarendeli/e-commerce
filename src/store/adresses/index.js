import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
const { request } = requestUtil();

const initialState = {
    loading: false,
    adressList: [],
    allAdressList: [],
    error: ''
}

export const fetchAdressList = createAsyncThunk(
    'adress/fetchAdressList',
    async (payload) => {
        const response = await request.post(`/CustomerAdress/Save`, payload);
        return response.data;
    }
)
export const fetchGetAdressList = createAsyncThunk(
    'adress/fetchGetAdressList',
    async (payload) => {
        const response = await request.get(`/CustomerAdress`, payload);
        return response.data;
    }
)

const adressSlice = createSlice({
    name: 'adress',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchAdressList.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchAdressList.fulfilled, (state, action) => {
            state.loading = false
            state.adressList = action.payload
            state.error = ''
        })
        builder.addCase(fetchAdressList.rejected, (state, action) => {
            state.loading = false
            state.adressList = []
            state.error = action.error.message
        })

        builder.addCase(fetchGetAdressList.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchGetAdressList.fulfilled, (state, action) => {
            state.loading = false
            state.allAdressList = action.payload
            state.error = ''
        })
        builder.addCase(fetchGetAdressList.rejected, (state, action) => {
            state.loading = false
            state.allAdressList = []
            state.error = action.error.message
        })
    }
})

export const selectAdressList = state => state.adress.adressList.data;
export const selectAllAdressList = state => state.adress.allAdressList?.data;
export default adressSlice.reducer;

