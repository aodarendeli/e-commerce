import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
const { request } = requestUtil();

const initialState = {
    loading: false,
    categoriesList: [],
    selectedCategoryList: [],
    error: ''
}

export const fecthCategoriesList = createAsyncThunk(
    'categoreis/fecthCategoriesList',
    async (payload) => {
        const response = await request.get('/Category', payload);
        return response.data;
    }
)
export const fecthCategoriesListWithId = createAsyncThunk(
    'categoreis/fecthCategoriesListbyId',
    async (id,payload) => {
        const response = await request.get(`/Category/${id}`, payload);
        return response.data;
    }
)

const sliderSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fecthCategoriesList.pending, state => {
            state.loading = true
        })
        builder.addCase(fecthCategoriesList.fulfilled, (state, action) => {
            state.loading = false
            state.categoriesList = action.payload
            state.error = ''
        })
        builder.addCase(fecthCategoriesList.rejected, (state, action) => {
            state.loading = false
            state.categoriesList = []
            state.error = action.error.message
        })

        builder.addCase(fecthCategoriesListWithId.pending, state => {
            state.loading = true
        })
        builder.addCase(fecthCategoriesListWithId.fulfilled, (state, action) => {
            state.loading = false
            state.selectedCategoryList = action.payload
            state.error = ''
        })
        builder.addCase(fecthCategoriesListWithId.rejected, (state, action) => {
            state.loading = false
            state.selectedCategoryList = []
            state.error = action.error.message
        })
    }
})


export const selectCategoriesist = state => state.categories.categoriesList.data;
export const selectedCategoriesist = state => state.categories.selectedCategoryList.data;


export default sliderSlice.reducer;

