import { createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"



const categoryAdapter = createEntityAdapter({})

const initialState = categoryAdapter.getInitialState()

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createCategory: builder.mutation({
      query: data => ({
        url: '/category',
        method: "POST",
        body: { ...data }
      }),
      invalidatesTags: [
        { type: 'Category', id: "CATEGORIES" }
      ]
    }),
    getCategories: builder.query({
      query: () => ({
        url: '/category',
        method: "GET"
      }),
      providesTags: [{ type: 'Category', id: "CATEGORIES" }]
    }),
    deleteCategory: builder.mutation({
      query: data => ({
        url: '/category',
        method: "DELETE",
        body: { ...data }
      }),
      invalidatesTags: [
        { type: 'Category', id: "CATEGORIES" },
        { type: 'Operation', id: "OPERATIONS" }
      ]
    })
  })
})

export const { useCreateCategoryMutation, useGetCategoriesQuery, useDeleteCategoryMutation } = categoryApiSlice