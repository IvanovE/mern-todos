import {createSlice} from "@reduxjs/toolkit"

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

    signUp: () => {},

    signIn: (state, {payload}) => {
      if (payload.accessToken) {
        state.accessToken = payload.accessToken
        state.isSignedIn = true
      }
    },

    logout: (state) => {
      state.accessToken = null
      state.isSignedIn = false
    }
  }
})

export const authReducer = authSlice.reducer
export const {signIn, signUp, logout, initAuth} = authSlice.actions
