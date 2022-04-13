import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {signIn, logout} from '../slices/authSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, {getState}) => {
      const {auth: {accessToken}} = getState()
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers
    }
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials
      })
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled, getCacheEntry}) {
        await queryFulfilled
        const response = getCacheEntry().data
        dispatch(signIn(response))
      }
    }),

    logout: build.mutation({
      query: () =>  ({
        url: '/logout',
        method: 'POST',
        credentials: 'include'
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        await queryFulfilled
        dispatch(logout())
      }
    })
  })
})

export const {useRegisterMutation, useLoginMutation, useLogoutMutation} = authApi
