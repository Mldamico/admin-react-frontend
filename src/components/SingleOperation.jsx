import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useDeleteOperationMutation } from '../store/operationSlice'
import { useNavigate } from 'react-router-dom'

export const SingleOperation = ({ operation }) => {

  const [deleteOperation, { isSuccess }] = useDeleteOperationMutation()
  const navigate = useNavigate()
  const onDelete = async () => {

    try {
      await deleteOperation({ id: operation.id }).unwrap()
    } catch (e) {
      console.log(e)
    }
  }


  const onEdit = () => {
    navigate(`edit/${operation.id}`, { state: operation })
  }

  return (
    <tr className="text-center">
      <td>{operation?.description}</td>
      <td>{operation?.amount}</td>
      <td >{operation?.type}</td>
      <td className='hidden sm:inline-block ' >{operation?.category?.name}</td>
      <td className='text-center'>
        <button
          className="icon-button table__button"
        // onClick={handleEdit}
        >
          <FontAwesomeIcon onClick={onEdit} className='text-yellow-600' icon={faPenToSquare} />

        </button>
      </td>
      <td className='text-center'><button> <FontAwesomeIcon onClick={onDelete} className='text-red-500' icon={faTrash} /> </button></td>
    </tr >
  )
}
