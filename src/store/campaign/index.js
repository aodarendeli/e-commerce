import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
const { request } = requestUtil();


const initialState = {
    loading: false,
    campaignList: [],
    error: ''
}

export const fecthCampaignList = createAsyncThunk(
    'campaign/fecthCampaignList',
    async (payload) => {
      const response = await request.get('/Campaign', payload);
      return response.data;
    } 
  )

const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fecthCampaignList.pending, state => {
            state.loading = true
        })
        builder.addCase(fecthCampaignList.fulfilled, (state, action) => {
            state.loading = false
            state.campaignList = action.payload
            state.error = ''
        })
        builder.addCase(fecthCampaignList.rejected, (state, action) => {
            state.loading = false
            state.campaignList = []
            state.error = action.error.message
        })
    }
})

export const selectCampaignList = state => state.campaign.campaignList.data;
export const selectCampignLoadingState = state => state.campaign.loading;
export const selectCampaignErrorState = state => state.campaign.error;

export default campaignSlice.reducer;

