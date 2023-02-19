import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
const { request } = requestUtil();

const initialState = {
    loading: false,
    sliderList: [],
    error: ''
}

export const fecthSliderList = createAsyncThunk(
    'slider/fecthSliderList',
    async (payload) => {
      const response = await request.get('/Slider', payload);
      return response.data;
    } 
  )

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fecthSliderList.pending, state => {
            state.loading = true
        })
        builder.addCase(fecthSliderList.fulfilled, (state, action) => {
            state.loading = false
            state.sliderList = action.payload
            state.error = ''
        })
        builder.addCase(fecthSliderList.rejected, (state, action) => {
            state.loading = false
            state.sliderList = []
            state.error = action.error.message
        })
    }
})

export const selectSliderList = state => state.slider.sliderList.data;
export const selectSliderLoadingState = state => state.slider.loading;
export const selectSliderErrorState = state => state.slider.error;

export default sliderSlice.reducer;

