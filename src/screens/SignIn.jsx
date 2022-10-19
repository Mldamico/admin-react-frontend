import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../store/authApiSlice'
import { setCredentials } from '../store/authSlice'

export const SignIn = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation()




  const handleLogin = async (e) => {
    e.preventDefault()
    if (username.length > 3 && password.length > 3) {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/management')
    }
  }

  return (
    <div className='my-64'>
      <form className='flex flex-col w-[80%] md:w-1/2 lg:w-1/3 space-y-6 rounded-lg p-5 mx-auto border-2 border-black text-white' onSubmit={handleLogin}>
        <div className='p-5'>
          <h2 className='text-center text-xl md:text-4xl'>Please Log into your account</h2>
        </div>
        <label htmlFor="username">Username: </label>
        <input className='bg-[rgb(36,36,36)] border-2 border-cyan-50 rounded-lg p-1' type="text" id='username' name='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} />
        <label htmlFor="password">Password: </label>
        <input className='bg-[rgb(36,36,36)] border-2 border-cyan-50 rounded-lg p-1' type="password" id='password' name='password' autoComplete='off' value={password} onChange={e => setPassword(e.target.value)} />
        <div className='flex justify-end '>
          <button className='py-2 px-6 border-2 rounded-xl border-white'>Login</button>
        </div>
      </form>
      <div className='flex justify-center text-white mt-2'>
        <p>Doesn't have an account? <Link to='/register' className='underline'>Please make a new one </Link></p>
      </div>
    </div>
  )
}
