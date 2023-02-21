import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
const { request } = requestUtil();


const initialState = {
    loading: false,
    campaignList: [],
    campaignSelectedList: [],
    error: ''
}

export const fecthCampaignList = createAsyncThunk(
    'campaign/fecthCampaignList',
    async (payload) => {
        const response = await request.get('/Campaign', payload);
        return response.data;
    }
)

export const fecthCampaignSelectedList = createAsyncThunk(
    'campaign/fecthCampaignSelectedList',
    async (id, payload) => {
        const response = await request.get(`/Campaign/${id}`, payload);
        return response.data;
    }
)

export const addCampaign = createAsyncThunk(
    'campaign/addCampaign',
    async (payload) => {
        const response = await request.post(`/Campaign/Save`, payload);
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



        builder.addCase(fecthCampaignSelectedList.pending, state => {
            state.loading = true
        })
        builder.addCase(fecthCampaignSelectedList.fulfilled, (state, action) => {
            state.loading = false
            state.campaignSelectedList = action.payload
            state.error = ''
        })
        builder.addCase(fecthCampaignSelectedList.rejected, (state, action) => {
            state.loading = false
            state.campaignSelectedList = []
            state.error = action.error.message
        })


        // builder.addCase(addCampaign.pending, state => {
        //     state.loading = true
        //     debugger
        // })
        // builder.addCase(addCampaign.fulfilled, (state, action) => {
        //     state.loading = false
        //     debugger
        //     // let arr = action.payload;
            
        //     // state.campaignList = state.campaignList.concat(arr)
        //     state.error = ''
        // })
        // builder.addCase(addCampaign.rejected, (state, action) => {
        //     debugger
        //     state.loading = false
        //     state.campaignSelectedList = []
        //     state.error = action.error.message
        // })
    }
})

export const selectCampaignList = state => state.campaign.campaignList.data;
export const selectCampaignSelectedList = state => state.campaign.campaignSelectedList.data;
export const selectCampignLoadingState = state => state.campaign.loading;
export const selectCampaignErrorState = state => state.campaign.error;

export default campaignSlice.reducer;

