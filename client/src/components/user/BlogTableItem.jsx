import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

  const { title, createdAt } = blog

  const blogDate = new Date(createdAt)

  const { axios, navigate, fetchBlogs: fetchHomeBlogs } = useAppContext()

  const deleteBlog = async () => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this blog?'
    )

    if (!confirmDelete) return

    try {

      // The selected user-owned blog is deleted.
      const { data } = await axios.post(
        '/api/user/blog/delete',
        {
          id: blog._id
        }
      )

      if (data.success) {

        toast.success(data.message)

        await fetchBlogs()

        if (fetchHomeBlogs) {
          await fetchHomeBlogs()
        }

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      toast.error(error.message)

    }

  }

  return (
    <tr className='border-y border-gray-300'>

      <th className='px-2 py-4'>
        {index}
      </th>

      <td className='px-2 py-4'>
        {title}
      </td>

      <td className='px-2 py-4 max-sm:hidden'>
        {blogDate.toLocaleString()}
      </td>

      <td className='px-2 py-4 max-sm:hidden'>

        <p
          className={`${
            blog.isPublished
              ? 'text-green-600'
              : 'text-orange-600'
          }`}
        >
          {blog.isPublished
            ? 'Published'
            : 'Pending Review'}
        </p>

      </td>

      <td className='px-2 py-4 flex text-xs gap-3'>

        <button
          onClick={() => navigate(`/user/editBlog/${blog._id}`)}
          className='w-20 whitespace-nowrap border border-gray-400 py-1 rounded cursor-pointer'
        >
          Edit
        </button>

        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          className='w-8 hover:scale-110 transition-all cursor-pointer'
          alt=""
        />

      </td>

    </tr>
  )
}

export default BlogTableItem