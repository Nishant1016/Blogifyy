import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Blog from './pages/Blog'

import UserLayout from './pages/user/Layout'
import UserListBlog from './pages/user/ListBlog'
import UserAddBlog from './pages/user/AddBlog'
import UserEditBlog from './pages/user/EditBlog'

import Dashboard from './pages/admin/Dashboard'
import Layout from './pages/admin/Layout'
import ListBlog from './pages/admin/ListBlog'
import AddBlog from './pages/admin/AddBlog'
import Comments from './pages/admin/Comments'

import Login from './components/admin/Login'
import UserLogin from './components/user/Userlogin'
import Register from './components/user/Register'

import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { token, userToken } = useAppContext()

  return (
    <div>
      <Toaster />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/blog/:id' element={<Blog />} />

        {/* Standard user authentication routes */}
        <Route path='/login' element={<UserLogin />} />
        <Route path='/register' element={<Register />} />

        {/* Existing administrator routes are kept unchanged */}
        <Route
          path='/admin'
          element={token ? <Layout /> : <Login />}
        >
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
        </Route>
        <Route
          path="/user"
          element={userToken ? <UserLayout /> : <UserLogin />}
        >
          <Route index element={<UserListBlog />} />
          <Route path="addBlog" element={<UserAddBlog />} />
          <Route path="editBlog/:id" element={<UserEditBlog />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App