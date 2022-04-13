import {signIn, logout, initAuth} from '../slices/authSlice'
import {initApp} from '../slices/appSlice'

export const localStorageMiddleware = store => next => action => {
  next(action)
  if (signIn.match(action)) {
    try {
      localStorage.setItem('accessToken', action.payload.accessToken)
    } catch (error) {
      console.log(error)
    }
  }

  if (logout.match(action)) {
    try {
      localStorage.removeItem('accessToken')
    } catch (error) {
      console.log(error)
    }
  }

  if (initApp.match(action)) {
    try {
      const accessToken = localStorage.getItem('accessToken')
      store.dispatch(initAuth({
        accessToken
      }))
    } catch (error) {
      console.log(error)
    }
  }
}
