import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {signIn, logout} from '../slices/authSlice'

export const appApi = createApi({
  reducerPath: 'appApi',
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
      query: () => ({
        url: '/logout',
        method: 'POST'
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        await queryFulfilled
        dispatch(logout())
      }
    }),

    create: build.mutation({
      query: (todo) => ({
        url: '/create',
        method: 'POST',
        body: todo
      })
    }),

    getTodos: build.query({
      query: () =>  '/todos'
    }),

    changeRating: build.mutation({
      query: (body) => ({
        url: '/change-rating',
        method: 'POST',
        body
      })
    }),

    changeStatus: build.mutation({
      query: (body) => ({
        url: '/change-status',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCreateMutation,
  useGetTodosQuery,
  useChangeRatingMutation,
  useChangeStatusMutation
} = appApi
