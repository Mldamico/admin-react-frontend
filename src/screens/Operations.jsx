import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SingleOperation } from '../components/SingleOperation'
import { TableComponent } from '../components/TableComponent'
import { useGetLastOperationsQuery, useGetOperationsQuery } from '../store/operationSlice'

export const Operations = () => {

  const { data, isSuccess, isLoading, isError, error } = useGetOperationsQuery()
  const { data: lastData, isSuccess: isLastSuccess, isLoading: isLastLoading, isError: isLastError, error: lastError } = useGetLastOperationsQuery()

  let content;
  let lastContent;

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isSuccess) {
    content = data?.map(op => <SingleOperation operation={op} key={op.id} />)
  }
  if (isLastSuccess) {
    lastContent = lastData?.map(op => <SingleOperation operation={op} key={op.id} />)
  }


  if (isError) {
    content = <p>{error}</p>
  }
  if (isLastError) {
    lastContent = <p>{lastError}</p>
  }

  return (
    <>
      <h2 className='text-center text-white text-2xl pt-10'>All operations</h2>
      <TableComponent>
        {content}
      </TableComponent>
      <h2 className='text-center text-white text-2xl pt-10'>Last 10 operations</h2>
      <TableComponent>
        {lastContent}
      </TableComponent>
    </>

  )
}
