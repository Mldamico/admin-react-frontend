import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { selectToken } from '../store/authSlice'

const useAuth = () => {
  const token = useSelector(selectToken)


  if (token) {
    const decoded = jwtDecode(token)

    const { username } = decoded.userInfo


    return { username }
  }

  return { username: null }
}
export default useAuth