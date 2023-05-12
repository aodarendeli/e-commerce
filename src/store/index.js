import { configureStore } from '@reduxjs/toolkit'
import todoSlice  from './todo'
import authSlice from './auth'
import campaignSlice from './campaign'
import sliderSlice from './slider'
import productSlice from './products'
import orderSlice from './order'
import categoriesSlice from './categories'
import checkoutSlice from './checkout'
import adressSlice from './adresses'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todo: todoSlice,
    campaign: campaignSlice,
    slider: sliderSlice,
    product: productSlice,
    order: orderSlice,
    categories: categoriesSlice,
    checkout: checkoutSlice,
    adress: adressSlice,
  },
})

