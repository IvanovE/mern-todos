import {configureStore} from "@reduxjs/toolkit"
import {authReducer} from "./slices/authSlice"
import {authApi} from "./api/authApi"
import {localStorageMiddleware} from "./middlewares/localStorage"
import {appReducer} from "./slices/appSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    initApp: appReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      localStorageMiddleware
    )
  }
})
