import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 sm:px-12 lg:px-20 xl:px-28'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10
      py-10 border-b border-gray-500/30 text-gray-500'>
        <div className='flex flex-col md:pt-8'>
            <div className='h-16 flex items-center'>
                <img
                    src={assets.logo}
                    alt="logo"
                    className='w-32 sm:w-44 object-contain'
                />
            </div>

            <p className='max-w-[320px] mt-2'>
                Blogify is a fast and intuitive platform for reading and sharing ideas across technology, startups, lifestyle, and finance.
            </p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5 md:pt-8'>
            {footer_data.map((section, index) => (
                <div key={index}>
                    <h3 className='font-semibold text-base text-gray-900 md:mb-5 
                    mb-2'>{section.title}</h3>
                    <ul className='text-sm space-y-1'>
                        {section.links.map((link, i)=> (
                            <li key={i}>
                                <a href="#" className='hover:underline hover:text-primary transition'>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
      <p className='py-4 text-center text-sm md:text-base 
      text-gray-500/80'>Copyright 2026 © Blogify - All Rights Reserved.</p>
    </div>
  )
}

export default Footer