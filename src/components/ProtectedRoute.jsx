import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useLocalStorage from '../hooks/useLocalStorage'
import { selectToken } from '../store/authSlice'

export const ProtectedRoute = () => {
  const location = useLocation()
  const token = useSelector(selectToken)

  const [storedUser] = useLocalStorage(token)
  const { username } = useAuth()




  return (
    <Outlet />
  )
}
