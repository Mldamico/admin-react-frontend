import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from './authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})


const baseQueryWithReauth = async (args, api, options) => {
  let result = await baseQuery(args, api, options)

  if (result?.error?.status === 403) {
    const refresh = await baseQuery('/auth/refresh', api, options)
    if (refresh?.data) {
      api.dispatch(setCredentials({ ...refresh?.data }))
      result = await baseQuery(args, api, options)
    } else {
      if (refresh?.error?.status === 403) {
        refresh.error.data.message = "Please login again"
      }
      return refresh
    }
  }
  return result
}


export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Operation'],
  endpoints: builder => ({})
})