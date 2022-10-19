import React from 'react'
import { Link } from 'react-router-dom'
export const TableComponent = ({ children, link = '/management/new' }) => {
  return (
    <>
      <div className='mx-auto w-[95%] md:w-1/2 bg-slate-600 mt-16 rounded-lg p-1 md:p-2'>
        <table className="table-layout w-full">
          <thead className="bg-purple-800 text-white text-center" >
            <tr>
              <th  >Description</th>
              <th >Amount</th>
              <th >Type</th>
              <th className='hidden sm:inline-block ' >Category</th>
              <th >Edit</th>
              <th >Delete</th>
            </tr>
          </thead>
          <tbody className='bg-slate-200'>
            {children}
          </tbody>
        </table>
        <Link to={link}>
          <button className='p-3 bg-green-500 w-full font-bold text-white'>New</button>
        </Link>
      </div>
    </>
  )
}
