import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/authSlice'
import Hamburger from './Hamburger'
import { motion } from 'framer-motion'
export const Navbar = () => {
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const onLogout = () => {
    dispatch(logout())
  }

  const content = (<>
    <Link className='border-white sm:border-b-[1px] p-3' to="/management">All Operations</Link>
    <Link className='border-white sm:border-b-[1px] p-3' to="/management/income">Income</Link>
    <Link className='border-white sm:border-b-[1px] p-3' to="/management/outcome">Outcome</Link>
    <Link className='border-white sm:border-b-[1px] p-3' to="/management/category">Categories</Link>
    <Link className='border-white sm:border-b-[1px] p-3' onClick={onLogout}>Logout</Link>
  </>

  )

  return (
    <div className='w-full sm:w-1/4 bg-purple-800 '>
      <div className="flex p-5 sm:px-0 items-center justify-between text-white container sm:space-y-12 mx-auto flex-row sm:flex-col">
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}> <h1 className='text-xl md:text-3xl'><Link to={"/management"}>Admin</Link></h1></motion.div>
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className='hidden md:flex md:flex-col w-full'>
          {content}
        </motion.div>
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
