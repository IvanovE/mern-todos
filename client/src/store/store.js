import {configureStore} from "@reduxjs/toolkit"
import {authReducer} from "./slices/authSlice"
import {appApi} from "./api/appApi"
import {localStorageMiddleware} from "./middlewares/localStorage"
import {appReducer} from "./slices/appSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    initApp: appReducer,
    [appApi.reducerPath]: appApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      appApi.middleware,
      localStorageMiddleware
    )
  }
})
