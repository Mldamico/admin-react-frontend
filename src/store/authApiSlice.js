import { apiSlice } from "./apiSlice";
import { setCredentials } from "./authSlice";


export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: "POST",
        body: { ...credentials }
      })
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (e) {
          console.log(e)
        }
      }
    })
  })
})

export const {
  useLoginMutation,
  useRefreshMutation
} = authApiSlice 