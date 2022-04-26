import {configureStore} from "@reduxjs/toolkit"
import {authReducer} from "./slices/authSlice"
import {appApi} from "./api/appApi"
import {actionsReducer} from "./slices/actionsSlice"
import {appReducer} from "./slices/appSlice"
import {localStorageMiddleware} from "./middlewares/localStorage"
import {notificationMiddleware} from "./middlewares/notification"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    initApp: appReducer,
    actions: actionsReducer,
    [appApi.reducerPath]: appApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      appApi.middleware,
      localStorageMiddleware,
      notificationMiddleware
    )
  }
})
