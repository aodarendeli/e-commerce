import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userInfo: localStorage.getItem('userInfo') ? JSON.parse
    (localStorage.getItem('userInfo')) : '',
  error: ''
}

//Register axios call
export const fecthRegisterUser = createAsyncThunk('fecthRegisterUser', async (body) => {
  const config = {
    headers: {
      'Content-Type': "application/json"
    }
  }
  const { data } = await axios.post('http://localhost:3001/api/users', body, config)

  localStorage.setItem('userInfo', JSON.stringify(data))
  return data;
})

//Login axios call
export const LoginUser = createAsyncThunk('login/user', async (body) => {
  try {
    const config = {
      headers: {
        'Content-Type': "application/json"
      }
    }
    const { data } = await axios.post('http://localhost:3001/api/users/login', body, config)

    localStorage.setItem('userInfo', JSON.stringify(data))
    return data;
  } catch (error) {
    return error.response.data.message
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo')
    }
  },
  extraReducers: builder => {
    builder.addCase(fecthRegisterUser.pending, state => {
      state.loading = true
    })
    builder.addCase(fecthRegisterUser.fulfilled, (state, action) => {
      state.loading = false
      state.userInfo = action.payload
      state.error = ''
    })
    builder.addCase(fecthRegisterUser.rejected, (state, action) => {
      state.loading = false
      state.userInfo = []
      state.error = action.error.message
    })
    builder.addCase(LoginUser.pending, state => {
      state.loading = true
    })
    builder.addCase(LoginUser.fulfilled, (state, {payload: {error,message}}) => {
      state.loading = false
      if(error){
        state.error = error
        console.log(error)
      }
      else{
        state.message = message
      }
    })
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loading = true
    })
  }
})


export const selectUserInfo = state => state.auth.userInfo;
export const selectLoadingState = state => state.auth.loading;
export const selectErrorState = state => state.auth.error;

export const { logout } = authSlice.actions;
export default authSlice.reducer;

