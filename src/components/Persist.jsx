import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "../store/authApiSlice"
import useLocalStorage from "../hooks/useLocalStorage"
import { useSelector } from 'react-redux'
import { selectToken } from "../store/authSlice"

const Persist = () => {

  const token = useSelector(selectToken)
  const effectRan = useRef(false)

  const [success, setSuccess] = useState(false)

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()


  useEffect(() => {

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token')
        try {
          await refresh()
          setSuccess(true)
        }
        catch (err) {
          console.error(err)
        }
      }

      if (!token) verifyRefreshToken()
    }

    return () => effectRan.current = true
  }, [])


  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = (
      <p className='errmsg'>
        {error.data?.message}
        <Link to="/login">Please login again</Link>.
      </p>
    )
  } else if (isSuccess && success) {

    content = <Outlet />
  } else if (token && isUninitialized) {
    content = <Outlet />
  }

  return content
}
export default Persist