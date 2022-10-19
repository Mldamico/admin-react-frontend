import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/authSlice'
import Hamburger from './Hamburger'

export const Navbar = () => {
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const onLogout = () => {
    dispatch(logout())
  }

  const content = (<>
    <Link className='border-transparent border-b-2 hover:border-b-2 hover:border-cyan-100' to="/management">All Operations</Link>
    <Link className='border-transparent border-b-2 hover:border-b-2 hover:border-cyan-100' to="/management/income">Income</Link>
    <Link className='border-transparent border-b-2 hover:border-b-2 hover:border-cyan-100' to="/management/outcome">Outcome</Link>
    <Link className='border-transparent border-b-2 hover:border-b-2 hover:border-cyan-100' to="/management/category">Categories</Link>
    <Link className='hover:border-b-2 hover:border-cyan-100' onClick={onLogout}>Logout</Link>
  </>

  )

  return (
    <div className='w-full bg-black p-5'>
      <div className="flex items-center justify-between text-white container mx-auto md:flex-row">
        <h1 className='text-xl md:text-3xl'>Admin</h1>
        <div className='hidden space-x-7 md:inline-flex'>
          {content}
        </div>
        <div className='md:hidden'>
          <Hamburger isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />
        </div>
      </div>
      {sidebarOpen && (
        <div className='flex flex-col items-center space-y-3 text-white '>
          {content}
        </div>
      )}

    </div>
  )
}
