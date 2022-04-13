import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  init: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initApp: (state) => {
      state.init = true
    }
  }
})

export const appReducer = appSlice.reducer
export const {initApp} = appSlice.actions
