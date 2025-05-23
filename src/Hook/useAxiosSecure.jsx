import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'

export const axiosSecure = axios.create({
  baseURL: 'https://highway-turf-server.vercel.app',  // Corrected URL format
  withCredentials: true,
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOut } = useAuth()

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res
      },
      async error => {
        console.log('Error caught from axios interceptor-->', error.response)
        if (error.response.status === 401 || error.response.status === 403) {
          // logout
          logOut()
          // navigate to login
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
  }, [logOut, navigate])

  return axiosSecure
}

export default useAxiosSecure
