import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { SingleOperation } from '../components/SingleOperation';
import { TableComponent } from '../components/TableComponent';
import { useGetOperationsByIncomeQuery } from '../store/operationSlice';

export const Income = () => {

  const { data, isSuccess, isLoading, isError, error } = useGetOperationsByIncomeQuery()


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
