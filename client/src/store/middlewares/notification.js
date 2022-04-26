import {logout, signIn} from "../slices/authSlice"
import {toast} from "react-toastify"
import {createTodo} from "../slices/actionsSlice"
import {signUp} from "../slices/authSlice"
import {isRejectedWithValue} from "@reduxjs/toolkit"

export const notificationMiddleware = store => next => action => {
  next(action)
  if (isRejectedWithValue(action)) {
    toast.warn(action.payload?.data?.message || 'Something went wrong')
  }

  if (signIn.match(action)) {
    toast.success('Welcome!')
  }

  if (logout.match(action)) {
    toast.info('Transition to the dark side completed...')
  }

  if (createTodo.match(action)) {
    toast.success('ToDo Created!')
  }

  if (signUp.match(action)) {
    toast.success('Account created!')
  }
}
