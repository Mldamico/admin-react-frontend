import React, { useState } from 'react'
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from '../store/categorySlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"

export const Category = () => {

  const [categoryName, setCategoryName] = useState('')
  const { data } = useGetCategoriesQuery()
  const [createCategory, { isSuccess }] = useCreateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const onCreateCategory = async () => {
    try {
      await createCategory({ name: categoryName }).unwrap()
      setCategoryName('')
    } catch (error) {
      console.log(error)
    }

  }

  const onDeleteCategory = async (id) => {
    try {
      await deleteCategory({ id }).unwrap()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-[80%] md:w-1/2 mx-auto'>
      <h2 className='text-center text-white text-3xl my-8'>Categories</h2>
      <div className='bg-[rgb(36,36,36)] text-white p-2 rounded-t-xl border-white border-[1px]'>
        {data?.length === 0 ? <h3 className='text-center text-xl font-semibold'>Add a category</h3> : data?.map(category => (
          <div key={category.id} className="flex flex-row-reverse items-center">
            <FontAwesomeIcon icon={faTrash} className='hover:text-red-500 mx-6 peer' onClick={() => onDeleteCategory(category.id)} />
            <p className='peer-hover:text-red-500 mx-6 flex-grow text-xl'>{category.name}</p>



          </div>


        ))}
      </div>
      <div className='flex'>
        <input placeholder='Category name' className='outline-none p-2' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        <button onClick={onCreateCategory} className='flex-grow bg-green-300'>Create Category</button>
      </div>
    </div>
  )
}
