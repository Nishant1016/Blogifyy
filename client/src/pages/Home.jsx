import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Layout from './admin/Layout'
import { assets } from '../assets/assets'

const Home = () => {
  return (
    <div>
      <div
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${assets.homePageBlogApp})` }}
      >
        <Navbar />
        <Header />
      </div>

      <BlogList />
      <Newsletter />
      <div className='mt-20'>
        <Footer />
      </div>
      
    </div>
  )
}

export default Home
