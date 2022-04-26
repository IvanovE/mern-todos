import {createSlice} from "@reduxjs/toolkit"

const initialState = {}

const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    createTodo: () => {}
  }
})

export const actionsReducer = actionsSlice.reducer
export const {createTodo} = actionsSlice.actions
