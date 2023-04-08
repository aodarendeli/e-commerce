import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
const { request } = requestUtil();

const initialState = {
    loading: false,
    productList: [],
    selectedProductList: [],
    mainProduct: [],
    originalProduct: [],
    otherProduct: [],
    error: ''
}

export const fecthProductList = createAsyncThunk(
    'product/fecthProductsList',
    async (payload) => {
        const response = await request.get('/Product/GetGrouppedProducts', payload);
        return response.data;
    }
)
export const fecthProductSelectedList = createAsyncThunk(
    'product/fecthProductSelectedList',
    async (id, payload) => {
        const response = await request.get(`/Product/${id}`, payload);
        return response.data;
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        swapProducts: (state, action) => {
            state.originalProduct = state.selectedProductList.data.mainProduct;
            state.mainProduct = action.payload;
            let arr = { ...state.mainProduct }
            let arr2 = { ...state.originalProduct }
            state.selectedProductList.data.mainProduct = arr

            for (let i = 0; i < state.selectedProductList.data.otherProducts.length; i++) {
                if (state.selectedProductList.data.otherProducts[i].name === arr.name)
                    state.selectedProductList.data.otherProducts[i] = arr2
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(fecthProductList.pending, state => {
            state.loading = true
        })
        builder.addCase(fecthProductList.fulfilled, (state, action) => {
            state.loading = false
            state.productList = action.payload
            state.error = ''
        })
        builder.addCase(fecthProductList.rejected, (state, action) => {
            state.loading = false
            state.productList = []
            state.error = action.error.message
        })

        // -----------
        builder.addCase(fecthProductSelectedList.pending, state => {
            state.loading = true
        })
        builder.addCase(fecthProductSelectedList.fulfilled, (state, action) => {
            state.loading = false
            state.selectedProductList = action.payload
            state.error = ''
        })
        builder.addCase(fecthProductSelectedList.rejected, (state, action) => {
            state.loading = false
            state.selectedProductList = []
            state.error = action.error.message
        })
    }
})

export const selectProductsList = state => state.product.productList.data;
export const selectedProductsList = state => state.product.selectedProductList.data;

export const { swapProducts } = productSlice.actions;
export default productSlice.reducer;
