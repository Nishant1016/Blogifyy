import client from '../configs/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';


// Blogs created by the authenticated user are returned.
export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            userId: req.userId,
            createdBy: "user"
        }).sort({createdAt: -1});

        res.json({success: true, blogs})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// A new blog is created and assigned to the authenticated user.
export const addUserBlog = async (req, res) => {
    try {
        const {title, subtitle, description, category} = JSON.parse
        (req.body.blog);

        const imageFile = req.file;

        // Check if all the required fields are present
        if(!title || !description || !category || !imageFile){
            return res.json({
                success: false,
                message: "Required fields are missing!"
            })
        }

        const fileBuffer = imageFile.buffer;

        // The uploaded image is stored through ImageKit.
        const response = await client.files.upload({
            file: fileBuffer.toString('base64'),
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        const image = response.url;

        // Publishing is restricted to administrators.
        await Blog.create({
            title,
            subtitle,
            description,
            category,
            image,
            isPublished: false,
            userId: req.userId,
            createdBy: "user"
        })

        res.json({
            success: true,
            message: "Blog added successfully and sent for admin review!"
        })

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// A single blog owned by the authenticated user is returned.
export const getUserBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findOne({
            _id: id,
            userId: req.userId,
            createdBy: "user"
        });

        if(!blog){
            return res.json({
                success: false,
                message: "Blog not found or access denied!"
            })
        }

        res.json({success: true, blog})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// A blog is updated only when it belongs to the authenticated user.
export const updateUserBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const {title, subtitle, description, category} = JSON.parse
        (req.body.blog);

        const blog = await Blog.findOne({
            _id: id,
            userId: req.userId,
            createdBy: "user"
        });

        if(!blog){
            return res.json({
                success: false,
                message: "Blog not found or access denied!"
            })
        }

        if(!title || !description || !category){
            return res.json({
                success: false,
                message: "Required fields are missing!"
            })
        }

        let image = blog.image;

        // A new image is uploaded only when it has been provided.
        if(req.file){
            const imageFile = req.file;
            const fileBuffer = imageFile.buffer;

            const response = await client.files.upload({
                file: fileBuffer.toString('base64'),
                fileName: imageFile.originalname,
                folder: '/blogs'
            })

            image = response.url;
        }

        blog.title = title;
        blog.subtitle = subtitle;
        blog.description = description;
        blog.category = category;
        blog.image = image;

        // Updated content is unpublished until it is reviewed again.
        blog.isPublished = false;

        await blog.save();

        res.json({
            success: true,
            message: "Blog updated successfully and sent for admin review!",
            blog
        })

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// A blog is deleted only when it belongs to the authenticated user.
export const deleteUserBlog = async (req, res) => {
    try {
        const { id } = req.body;

        const blog = await Blog.findOne({
            _id: id,
            userId: req.userId,
            createdBy: "user"
        });

        if(!blog){
            return res.json({
                success: false,
                message: "Blog not found or access denied!"
            })
        }

        await Blog.findByIdAndDelete(id);

        // All comments associated with the deleted blog are removed.
        await Comment.deleteMany({blog: id});

        res.json({
            success: true,
            message: "Blog deleted successfully!"
        })

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}