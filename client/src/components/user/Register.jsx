import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const Register = () => {
  const { axios, setToken, navigate } = useAppContext()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match')
    }

    try {
      setIsSubmitting(true)

      // User registration is completed through the public authentication endpoint.
      // Administrator accounts are managed separately and cannot be created here.
      const { data } = await axios.post('/api/user/register', {
        name,
        email,
        password
      })

      if (data.success) {
        setToken(data.token)
        localStorage.setItem('userToken', data.token)
        axios.defaults.headers.common['Authorization'] = data.token

        toast.success(data.message || 'Account created successfully')
        navigate('/user')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-50/20'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30
      shadow-xl shadow-primary/15 rounded-lg bg-white'>

        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              Create <span className='text-primary'>Account</span>
            </h1>

            <p className='font-light text-gray-500 mt-2'>
              Join Blogify and start managing your blogs.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='mt-6 sm:max-w-md w-full text-gray-600'
          >
            <div className='flex flex-col'>
              <label>Full Name</label>

              <input
                type='text'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your full name...'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>

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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Create a password...'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>

            <div className='flex flex-col'>
              <label>Confirm Password</label>

              <input
                type='password'
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm your password...'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-3 font-medium bg-primary text-white rounded
              cursor-pointer hover:bg-primary/90 transition-all
              disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className='mt-6 text-sm text-gray-500'>
            Already have an account?

            <button
              type='button'
              onClick={() => navigate('/login')}
              className='ml-1 text-primary hover:underline cursor-pointer'
            >
              Login
            </button>
          </p>

          <div className='w-full border-t border-gray-200 my-6'></div>

          <p className='text-xs text-gray-400'>
            Administrator Access
          </p>

          <button
            type='button'
            onClick={() => navigate('/admin')}
            className='mt-2 text-sm text-primary hover:underline cursor-pointer'
          >
            Admin Login →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register