import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    const {navigate, token} = useAppContext();

  return (
    <div className='flex justify-between items-center mx-8 sm:mx-20 xl:mx-32'>
        <img onClick={() => navigate('/')} src={assets.logo} alt='logo' className='w-40 sm:w-43 h-auto object-contain cursor-pointer' />
        <button onClick={() => navigate('/admin')} className='flex items-center gap-2 rounded-full 
        text-sm cursor-pointer bg-primary text-white px-6 py-2.5'>
          {token ? 'Dashboard' : 'Login'}
            <img src={assets.arrow} alt="arrow" className='w-3' />
        </button>
      
    </div>
  )
}

export default Navbar
