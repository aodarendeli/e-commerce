import { configureStore } from '@reduxjs/toolkit'
import todoSlice  from './todo'
import authSlice from './auth'
import campaignSlice from './campaign'
import sliderSlice from './slider'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todo: todoSlice,
    campaign: campaignSlice,
    slider: sliderSlice,
  },
})

