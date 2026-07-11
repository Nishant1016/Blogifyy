import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const EditBlog = () => {

  const { id } = useParams()

  const { axios, navigate } = useAppContext()

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [existingImage, setExistingImage] = useState('')

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('')

  const [isUpdating, setIsUpdating] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchBlog = async () => {

    try {

      // The selected user-owned blog is requested.
      const { data } = await axios.get(
        `/api/user/blog/${id}`
      )

      if (data.success) {

        const blog = data.blog

        setTitle(blog.title)

        setSubtitle(blog.subtitle)

        setCategory(blog.category)

        setExistingImage(blog.image)

        quillRef.current.root.innerHTML =
          blog.description

      } else {

        toast.error(data.message)

        navigate('/user')

      }

    } catch (error) {

      toast.error(error.message)

      navigate('/user')

    } finally {

      setLoading(false)

    }

  }

  const onSubmitHandler = async (e) => {

    e.preventDefault()

    try {

      setIsUpdating(true)

      // The updated blog is returned for administrator review.
      const blog = {

        title,

        subtitle,

        description:
          quillRef.current.root.innerHTML,

        category

      }

      const formData = new FormData()

      formData.append(
        'blog',
        JSON.stringify(blog)
      )

      if (image) {

        formData.append(
          'image',
          image
        )

      }

      const { data } = await axios.put(
        `/api/user/blog/update/${id}`,
        formData
      )

      if (data.success) {

        toast.success(data.message)

        navigate('/user')

      } else {

        toast.error(data.message)

    }

    } catch (error) {

      toast.error(error.message)

    } finally {

      setIsUpdating(false)

    }

  }

  useEffect(() => {

    if (
      !quillRef.current &&
      editorRef.current
    ) {

      quillRef.current = new Quill(
        editorRef.current,
        {
          theme: 'snow'
        }
      )

      fetchBlog()

    }

  }, [])

  return  (

        <form
        onSubmit={onSubmitHandler}
        className='relativeflex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'
        >

          {loading && (
            <div className='absolute inset-0 z-10 flex items-center justify-center bg-blue-50/80'>
              <p className='text-gray-500'>Loading...</p>
            </div>
          )}

        <div
            className='bg-white w-full max-w-3xl
            p-4 md:p-10 sm:m-10 shadow rounded'
        >

            <p>Update thumbnail</p>

            <label htmlFor='image'>

            <img
                src={
                image
                    ? URL.createObjectURL(image)
                    : existingImage
                }
                className='mt-2 h-16 cursor-pointer rounded'
                alt=''
            />

            <input
                type='file'
                id='image'
                hidden
                onChange={(e) =>
                setImage(e.target.files[0])
                }
            />

            </label>

            <p className='mt-4'>
            Blog title
            </p>

            <input
            type='text'
            required
            className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
            value={title}
            onChange={(e) =>
                setTitle(e.target.value)
            }
            />

            <p className='mt-4'>
            Sub title
            </p>

            <input
            type='text'
            required
            className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
            value={subtitle}
            onChange={(e) =>
                setSubtitle(e.target.value)
            }
            />

            <p className='mt-4'>
                Blog description
            </p>

            <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
                <div ref={editorRef}></div>
            </div>

            <p className='mt-4'>
                Blog category
            </p>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
                >
                <option value=''>
                    Select category
                </option>

                {blogCategories.map((item, index) => (
                    <option
                    key={index}
                    value={item}
                    >
                    {item}
                    </option>
                ))}
            </select>

            <div className='mt-4'>
                <p className='text-sm text-gray-500'>
                    Updates will be submitted for administrator review before publication.
                </p>
            </div>

            <button
                disabled={isUpdating}
                type='submit'
                className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'
            >
                {isUpdating ? 'Updating...' : 'Update Blog'}
            </button>

        </div>
    </form>
  )
}

export default EditBlog
          