import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {signIn, logout} from '../slices/authSlice'
import {createTodo} from "../slices/actionsSlice"

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  prepareHeaders: (headers, {getState}) => {
    const {auth: {accessToken}} = getState()
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    api.dispatch(logout())
  }
  return result
}

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Todo'],
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
      }),
      invalidatesTags: ['Todo'],
      async onQueryStarted(arg, {dispatch, queryFulfilled, getCacheEntry}) {
        await queryFulfilled
        const response = getCacheEntry().data
        dispatch(createTodo(response))
      }
    }),

    getTodos: build.query({
      query: () =>  '/todos',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todo', id })), 'Todo']
          : ['Todo']
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
