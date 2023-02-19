import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestUtil from '../../helpers/requestUtil'
import axios from "axios";

const { request } = requestUtil();

const initialState = {
  loading: false,
  userInfo: localStorage.getItem('userInfo') ? JSON.parse
    (localStorage.getItem('userInfo')) : '',
  error: ''
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

// export const LoginUser = createAsyncThunk('login/user', async (body) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': "application/json"
//       }
//     }
//     const { data } = await axios.post('http://localhost:3001/api/users/login', body, config)

//     localStorage.setItem('userInfo', JSON.stringify(data))
//     return data;
//   } catch (error) {
//     return error.response.data.message
//   }
// })

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
      console.log(state.error)
      if(action.payload == "Kullanıcı Adı veya Şifre hatalı"){
        state.userInfo = "";
        state.error = action.payload;
      }
      else{
        state.userInfo = action.payload
      }
    })
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
})


export const selectUserInfo = state => state.auth.userInfo;
export const selectLoadingState = state => state.auth.loading;
export const selectErrorState = state => state.auth.error;

export const { logout } = authSlice.actions;
export default authSlice.reducer;

