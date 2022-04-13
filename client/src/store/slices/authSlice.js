import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-toastify"

const initialState = {
  isSignedIn: false,
  accessToken: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initAuth: (state, {payload}) => {
      if (payload.accessToken) {
        state.accessToken = payload.accessToken
        state.isSignedIn = true
      }
    },

    signIn: (state, {payload}) => {
      if (payload.accessToken) {
        state.accessToken = payload.accessToken
        state.isSignedIn = true
      }
    },

    logout: (state) => {
      state.accessToken = null
      state.isSignedIn = false
      toast.success('Transition to the dark side completed...')
    }
  }
})

export const authReducer = authSlice.reducer
export const {signIn, logout, initAuth} = authSlice.actions
