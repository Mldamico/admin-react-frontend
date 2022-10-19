import React, { useEffect } from 'react'
import { useRecentsUserQuery } from '../store/userSlice'

export const LastUsers = () => {

  const { data } = useRecentsUserQuery()
  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])
  return (
    <div>sasd</div>
  )
}
