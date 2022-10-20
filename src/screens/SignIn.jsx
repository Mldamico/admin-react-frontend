import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../store/authApiSlice'
import { setCredentials } from '../store/authSlice'

export const SignIn = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation()

  const canSubmit = username.length > 3 && password.length > 3


  useEffect(() => { }, [isSuccess, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      if (canSubmit) {
        const { accessToken } = await login({ username, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setUsername('')
        setPassword('')

        navigate('/management')
      }
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
    }

  }

  return (
    <div className='my-64'>
      <form className='flex flex-col w-[80%] md:w-1/2 lg:w-1/3 space-y-6 rounded-lg p-5 mx-auto border-2 border-white text-white bg-purple-800 mb-8' onSubmit={handleLogin}>
        <div className='p-5'>
          <h2 className='text-center text-xl md:text-4xl'>Please Log into your account</h2>
        </div>
        <label htmlFor="username">Username: </label>
        <input className='bg-[rgb(36,36,36)] border border-white rounded-lg p-1 outline-none' type="text" id='username' name='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} />
        <label className='pt-4' htmlFor="password">Password: </label>
        <input className='bg-[rgb(36,36,36)] border border-white rounded-lg p-1 outline-none' type="password" id='password' name='password' autoComplete='off' value={password} onChange={e => setPassword(e.target.value)} />
        {isError && (
          <div>
            <p className='text-center text-red-400 text-xl font-bold'>{errMsg}</p>
          </div>
        )}
        <div className='flex justify-end pt-4'>
          <button disabled={!canSubmit} className='disabled:bg-gray-300 disabled:text-black py-2 px-6 border-2 rounded-xl border-white hover:bg-[rgb(36,36,36)]'>Login</button>
        </div>
      </form>
      <div className='flex justify-center text-white mt-2'>
        <p>Doesn't have an account? <Link to='/register' className='underline hover:text-purple-400'>Please make a new one </Link></p>
      </div>
    </div>
  )
}
