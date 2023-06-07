import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
import axios from "axios";

const { request } = requestUtil();

const initialState = {
  loading: false,
  userInfo: localStorage.getItem('userInfo') ? JSON.parse
    (localStorage.getItem('userInfo')) : '',
  error: '',
  admin: [],
  controlUser: [],
}

// Register axios call
export const fecthRegisterUser = createAsyncThunk(
  'auth/register',
  async (payload) => {
    try {
      const response = await request.post('/Auth/Register', payload);
      localStorage.setItem('userInfo', JSON.stringify(response))
      return response.data;
    } catch (error) {
      return error.response.data
    }
  }
)
//Login axios call

export const LoginUser = createAsyncThunk(
  'auth/login',
  async (payload) => {
    try {
      const response = await request.post('/Auth/SignIn', payload);
      localStorage.setItem('userInfo', JSON.stringify(response))
      return response.data;
    } catch (error) {
      return error.response.data
    }

  }
)

export const checkAdmin = createAsyncThunk(
  'auth/AdminUser',
  async (payload) => {
    try {
      const response = await request.get('/AdminUser', payload);
      return response.data;
    } catch (error) {
      return error.response.data
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userGuid')
    },
    controlUser: (state, action) => {
      state.controlUser = action.payload;
      localStorage.setItem("userGuid",`${action.payload.guid}`)
    }
  },
  extraReducers: builder => {
    builder.addCase(fecthRegisterUser.pending, state => {
      state.loading = true
    })
    builder.addCase(fecthRegisterUser.fulfilled, (state, action) => {
      state.loading = false
      state.userInfo = action.payload
    })
    builder.addCase(fecthRegisterUser.rejected, (state, action) => {
      state.loading = false
      state.userInfo = []
      state.error = action.payload
    })

    builder.addCase(LoginUser.pending, state => {
      state.loading = true
    })
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.loading = false
      if (action.payload == "Kullanıcı Adı veya Şifre hatalı") {
        state.userInfo = "";
        state.error = action.payload;
      }
      else {
        state.userInfo = action.payload
      }
    })
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    builder.addCase(checkAdmin.pending, state => {
      state.loading = true
    })
    builder.addCase(checkAdmin.fulfilled, (state, action) => {
      state.loading = false
      state.admin = action.payload
    })
    builder.addCase(checkAdmin.rejected, (state, action) => {
      state.loading = false
      state.admin = []
      state.error = action.payload
    })
  }
})


export const selectUserInfo = state => state.auth.userInfo;
export const selectLoadingState = state => state.auth.loading;
export const selectErrorState = state => state.auth.error;
export const selectAdmin = state => state.auth.admin;


export const { logout, controlUser } = authSlice.actions;
export default authSlice.reducer;

