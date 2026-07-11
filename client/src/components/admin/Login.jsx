import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const AdminLogin = () => {
  const { axios, setToken, navigate } = useAppContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Administrator authentication is handled through a dedicated endpoint.
      // Access to publishing and moderation features is restricted to this role.
      const { data } = await axios.post('/api/admin/login', {
        email,
        password
      })

      if (data.success) {
        setToken(data.token)
        localStorage.setItem('adminToken', data.token)
        axios.defaults.headers.common['Authorization'] = data.token

        navigate('/admin')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      )
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-blue-50/20'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30
      shadow-xl shadow-primary/15 rounded-lg bg-white'>

        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='text-primary'>Admin</span> Login
            </h1>

            <p className='font-light text-gray-500 mt-2'>
              Enter your credentials to access the admin panel.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='mt-6 sm:max-w-md w-full text-gray-600'
          >
            <div className='flex flex-col'>
              <label>Email</label>

              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email...'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>

            <div className='flex flex-col'>
              <label>Password</label>

              <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password...'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>

            <button
              type='submit'
              className='w-full py-3 font-medium bg-primary text-white rounded
              cursor-pointer hover:bg-primary/90 transition-all'
            >
              Login
            </button>
          </form>

          <div className='w-full border-t border-gray-200 my-6'></div>

          <button
            type='button'
            onClick={() => navigate('/login')}
            className='text-sm text-primary hover:underline cursor-pointer'
          >
            ← Back to User Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin