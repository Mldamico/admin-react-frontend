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
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Operation", id: 'OPERATIONS' },
            ...result.ids.map(id => ({ type: 'Operation', id }))
          ]
        } else return [{ type: "Operation", id: 'OPERATIONS' }]
      }
    }),
    getOperationsByIncome: builder.query({
      query: () => ({
        url: '/operation/income',
        method: 'GET'
      }),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Operation", id: 'OPERATIONS' },
            ...result.ids.map(id => ({ type: 'Operation', id }))
          ]
        } else return [{ type: "Operation", id: 'OPERATIONS' }]
      }
    }),
    getOperationsByOutcome: builder.query({
      query: () => ({
        url: '/operation/outcome',
        method: 'GET'
      }),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Operation", id: 'OPERATIONS' },
            ...result.ids.map(id => ({ type: 'Operation', id }))
          ]
        } else return [{ type: "Operation", id: 'OPERATIONS' }]
      }
    }),
    getLastOperations: builder.query({
      query: () => ({
        url: '/operation/last',
        method: 'GET'
      }),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Operation", id: 'OPERATIONS' },
            ...result.ids.map(id => ({ type: 'Operation', id }))
          ]
        } else return [{ type: "Operation", id: 'OPERATIONS' }]
      }
    }),
    editOperation: builder.mutation({
      query: (data) => ({
        url: '/operation',
        method: 'PATCH',
        body: {
          ...data
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Operation', id: arg.id }
      ]
    }),
    deleteOperation: builder.mutation({

      query: (data) => ({
        url: '/operation',
        method: 'DELETE',
        body: { ...data }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Operation', id: arg.id }
      ]
    })
  }),

})

export const { useCreateOperationMutation, useGetOperationsQuery, useGetOperationsByIncomeQuery, useGetOperationsByOutcomeQuery, useEditOperationMutation, useDeleteOperationMutation, useGetLastOperationsQuery } = operationApiSlice