import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: initialData => ({
        url: '/auth/signup',
        method: 'POST',
        body: {
          ...initialData
        }
      }),
      invalidatesTags: [{ type: "User", id: "Users" }]
    }),
    recentsUser: builder.query({
      query: () => ({
        url: '/users/last10',
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
        provideTags: [{ type: "User", id: 'Users' }]
      })
    })
  })
})


export const {
  useRegisterMutation,
  useRecentsUserQuery
} = usersApiSlice

