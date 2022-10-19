import React from 'react'
import { SingleOperation } from '../components/SingleOperation';
import { TableComponent } from '../components/TableComponent';
import { useGetOperationsByOutcomeQuery } from '../store/operationSlice';

export const Outcome = () => {

  const { data, isSuccess, isLoading, isError, error } = useGetOperationsByOutcomeQuery()


  let content;

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isSuccess) {
    content = data?.map(op => <SingleOperation operation={op} key={op.id} />)
  }

  if (isError) {
    content = <p>{error}</p>
  }

  return (
    <TableComponent>
      {content}
    </TableComponent>
  )
}
