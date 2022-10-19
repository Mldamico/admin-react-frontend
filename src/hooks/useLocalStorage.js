import { useState, useEffect } from "react"

const useLocalStorage = (token) => {
  const [local, setLocal] = useState(JSON.parse(localStorage.getItem('jwt')));

  useEffect(() => {
    localStorage.setItem('jwt', JSON.stringify(token))
  }, [local])

  return [local, setLocal]
}
export default useLocalStorage