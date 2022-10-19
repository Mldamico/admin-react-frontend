import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegisterMutation } from '../store/userSlice'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation()




  const createUser = async (e) => {
    e.preventDefault()
    if (username.length > 3 && password.length > 3) {
      const { accessToken } = await register({ username, password })

      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/management')
    }
  }

  return (
    <div className='my-64'>
      <form className='flex flex-col w-[80%] md:w-1/2 lg:w-1/3 space-y-6 rounded-lg p-5 mx-auto border-2 border-white text-white' onSubmit={createUser}>
        <div className='p-5'>
          <h2 className='text-center text-xl md:text-4xl'>Register a new account</h2>
        </div>
        <label htmlFor="username">Username: </label>
        <input className='bg-[rgb(36,36,36)] border-[1px] border-cyan-50 rounded-lg p-1 outline-none' type="text" id='username' name='username' autoComplete='off' value={username} onChange={e => setUsername(e.target.value)} />
        <label className='pt-4' htmlFor="password">Password: </label>
        <input className='bg-[rgb(36,36,36)] border-[1px] border-cyan-50 rounded-lg p-1 outline-none' type="password" id='password' name='password' autoComplete='off' value={password} onChange={e => setPassword(e.target.value)} />
        <div className='flex justify-end pt-4'>
          <button className='py-2 px-6 border-2 rounded-xl border-white'>Register</button>
        </div>
      </form>
      <div className='flex justify-center text-white mt-2'>
        <p>Already have an account? <Link to='/' className='underline'>Please log in</Link></p>
      </div>
    </div>
  )
}

export default SignUp