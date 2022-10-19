import React from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Operations } from '../screens/Operations'
import { LastUsers } from './LastUsers'
import { Navbar } from './Navbar'

export const ManagementLayout = () => {
  const { username } = useAuth()
  return (
    <>
      <Navbar />


      <Outlet />

    </>
  )
}
