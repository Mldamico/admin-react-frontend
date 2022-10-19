import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { useGetCategoriesQuery } from '../store/categorySlice'
import { useCreateOperationMutation, useEditOperationMutation } from '../store/operationSlice'

export const CreateNewOperation = () => {
  const { id } = useParams()
  const { state } = useLocation()

  const [description, setDescription] = useState(state?.description ?? "")
  const [amount, setAmount] = useState(state?.amount ?? "")
  const [type, setType] = useState(state?.type ?? "Income")
  const [category, setCategory] = useState(state?.category?.name ?? "")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data: categories } = useGetCategoriesQuery()

  const [addOperation, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateOperationMutation()
  const [editOperation, { isSuccess: success }] = useEditOperationMutation()
  const createOperation = async (e) => {
    e.preventDefault()
    try {
      if (state) {
        await editOperation({ description, amount, id }).unwrap()
      } else {

        await addOperation({ description, amount, type, categoryId: category }).unwrap()
        setDescription('')
        setAmount(0)
        setType('Income')
      }


    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='my-16 '>
      <form className='flex flex-col w-[80%] md:w-1/2 lg:w-1/3 space-y-4 md:space-y-8 rounded-lg p-3 mx-auto border-2 border-black text-white bg-slate-600' onSubmit={createOperation}>
        <div className='p-5  rounded-t-lg'>
          <h2 className='text-center text-xl md:text-4xl'>{state ? "Edit the operation" : "Create New Operation"}</h2>
        </div>
        <label htmlFor="description">Description: </label>
        <input className='bg-[rgb(36,36,36)] border-[1px] border-cyan-50 rounded-lg p-1 outline-none' type="text" id='description' name='description' autoComplete='off' value={description} onChange={e => setDescription(e.target.value)} />
        <label htmlFor="amount">Amount: </label>
        <input className='bg-[rgb(36,36,36)] border-[1px] border-cyan-50 rounded-lg p-1' type="number" id='amount' name='amount' autoComplete='off' value={amount} onChange={e => setAmount(e.target.value)} />
        <label htmlFor="type">Type: </label>
        <select
          id="type"
          className='text-white p-1 bg-[rgb(36,36,36)]'
          name="type"
          value={type}

          onChange={e => setType(e.target.value)}
          disabled={state}
        >
          <option value="Income">Income</option>
          <option value="Outcome">Outcome</option>
        </select>
        <select
          id="type"
          className='text-white p-1 bg-[rgb(36,36,36)]'
          name="type"
          value={category}

          onChange={e => setCategory(e.target.value)}
          disabled={state}
        >
          <option>{state ? state.category.name : ""}</option>
          {categories?.map(singleCategory => (
            <option key={singleCategory.id} value={singleCategory.id}>{singleCategory.name}</option>
          ))}

        </select>
        <div className='flex justify-end '>
          <button className='w-full py-3 border-[1px] rounded-xl border-white bg-green-500 font-bold'>{state ? "Edit" : "Create"}</button>
        </div>
      </form>

    </div>
  )
}
