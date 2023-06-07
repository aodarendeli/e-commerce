import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todoSlice  from './todo'
import authSlice from './auth'
import campaignSlice from './campaign'
import sliderSlice from './slider'
import productSlice from './products'
import orderSlice from './order'
import categoriesSlice from './categories'
import checkoutSlice from './checkout'
import adressSlice from './adresses'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducer = combineReducers({
  auth: authSlice,
  todo: todoSlice,
  campaign: campaignSlice,
  slider: sliderSlice,
  product: productSlice,
  order: orderSlice,
  categories: categoriesSlice,
  checkout: checkoutSlice,
  adress: adressSlice,
})

const persistedReducer =  persistReducer(persistConfig,reducer)

export const store = configureStore({
  reducer: persistedReducer
})

