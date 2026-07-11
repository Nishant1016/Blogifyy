import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import heroImage from '../assets/hero.png'
import { useAppContext } from '../context/AppContext'

const topics = [
    { label: 'Blog Creation', icon: '✍️' },
    { label: 'Content Management', icon: '📂' },
    { label: 'User Authentication', icon: '🔐' },
    { label: 'Comments & Engagement', icon: '💬' },
    { label: 'Responsive UI', icon: '📱' },
]

const Header = () => {

    const { setInput, input } = useAppContext()
    const inputRef = useRef()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        setInput(inputRef.current.value)
    }

    const onClear = () => {
        setInput('')
        inputRef.current.value = ''
    }

    return (
        <section className='overflow-hidden px-6 sm:px-12 lg:px-20 xl:px-28 pt-2 pb-24'>
            <div className='max-w-5xl mx-auto text-center'>
                <div>
                    <div className='inline-flex items-center gap-2 px-4 py-2 mb-6 
                    rounded-full border border-primary/20 bg-white/70 shadow-sm 
                    backdrop-blur text-sm text-primary font-medium'>
                        <img src={assets.star_icon} alt="" className='w-3' />
                        <span>Create Content That Inspires</span>
                    </div>

                    <h1 className='text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight text-gray-900'>
                        Learn, <span className='text-primary'>Build</span>, Share
                    </h1>

                    <p className='mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-8 text-gray-600'>
                        Discover insightful articles, practical tutorials, emerging technologies, <br />and the 
                        trends driving innovation in today's digital world.
                    </p>

                    <form
                        onSubmit={onSubmitHandler}
                        className='mt-8 max-w-2xl mx-auto flex items-center gap-3 rounded-2xl border 
                        border-gray-200 bg-white p-2 shadow-lg shadow-primary/10'
                    >
                        <div className='flex items-center gap-3 flex-1 px-3'>
                            <span className='text-xl text-gray-400'>⌕</span>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder='Search articles, tutorials, and tech insights...'
                                required
                                className='w-full bg-transparent py-1 text-sm sm:text-base text-gray-700 outline-none placeholder:text-gray-400'
                            />
                        </div>
                        <button
                            type='submit'
                            className='bg-primary text-white px-5 sm:px-7 py-1 rounded-xl font-medium hover:scale-105 transition-all cursor-pointer'
                        >
                            Search
                        </button>
                    </form>

                    <div className='mt-5 min-h-8'>
                        {input && (
                            <button
                                onClick={onClear}
                                className='text-sm text-gray-500 hover:text-primary transition cursor-pointer'
                            >
                                Clear search
                            </button>
                        )}
                    </div>

                    <div className='mt-4 flex flex-wrap justify-center gap-3'>
                        {topics.map((topic) => (
                            <span
                                key={topic.label}
                                className='inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm'
                            >
                                <span className='text-primary'>{topic.icon}</span>
                                {topic.label}
                            </span>
                        ))}
                    </div>
                </div>

                
            </div>
        </section>
    )
}

export default Header
