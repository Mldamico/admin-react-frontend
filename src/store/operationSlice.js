import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";



const operationAdapter = createEntityAdapter({})

const initialState = operationAdapter.getInitialState()

export const operationApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOperation: builder.mutation({
      query: initialData => ({
        url: '/operation',
        method: 'POST',
        body: {
          ...initialData
        }
      }),
      invalidatesTags: [
        { type: 'Operation', id: "OPERATIONS" }
      ]
    }),
    getOperations: builder.query({
      query: () => ({
        url: '/operation',
        method: 'GET'
      }),
      providesTags: [{ type: "Operation", id: 'OPERATIONS' }]
    }),
    getOperationsByIncome: builder.query({
      query: () => ({
        url: '/operation/income',
        method: 'GET'
      }),
      providesTags: [{ type: "Operation", id: 'OPERATIONS' }]
    }),
    getOperationsByOutcome: builder.query({
      query: () => ({
        url: '/operation/outcome',
        method: 'GET'
      }),
      providesTags: [{ type: "Operation", id: 'OPERATIONS' }]
    }),
    getLastOperations: builder.query({
      query: () => ({
        url: '/operation/last',
        method: 'GET'
      }),
      providesTags: [{ type: "Operation", id: 'OPERATIONS' }]
    }),
    editOperation: builder.mutation({
      query: (data) => ({
        url: '/operation',
        method: 'PATCH',
        body: {
          ...data
        }
      }),
      invalidatesTags: [
        { type: 'Operation', id: "OPERATIONS" }
      ]
    }),
    deleteOperation: builder.mutation({

      query: (data) => ({
        url: '/operation',
        method: 'DELETE',
        body: { ...data }
      }),
      invalidatesTags: [
        { type: 'Operation', id: "OPERATIONS" }
      ]
    })
  }),

})

export const { useCreateOperationMutation, useGetOperationsQuery, useGetOperationsByIncomeQuery, useGetOperationsByOutcomeQuery, useEditOperationMutation, useDeleteOperationMutation, useGetLastOperationsQuery } = operationApiSlice