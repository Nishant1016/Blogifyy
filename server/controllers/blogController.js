import fs from 'fs';
import client from '../configs/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse
        (req.body.blog);
        const imageFile = req.file;
        const fileBuffer = imageFile.buffer;

        // Check if all the fields are present
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Required fields are missing!"})
        }

        console.log("Request reached addBlog");
        console.log("Image file:", req.file);
        console.log("Before ImageKit upload");

        console.log(process.env.IMAGEKIT_URL_ENDPOINT);    

        // Upload Image to ImageKit
        const response = await client.files.upload({
            file: fileBuffer.toString('base64'),
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        console.log("After ImageKit upload", response);

        // optimization through imagekit URL transformation
       
        const image = response.url;

        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({success: true, message: "Blog addded successfully!"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            res.json({success: false, message: "Blog not found!"})
        }
        res.json({success: true, blog})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findByIdAndDelete(id);

        // Delete all comments associated with the blog
        await Comment.deleteMany({blog: id});
        
        res.json({success: true, message: "Blog deleted successfully!", blog})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({
            success: true, 
            message: "Blog's status toggled successfully!", 
            blog
        })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addComment = async (req, res) => {
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content})
        res.json({success: true, message: 'Comment added for review'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort
        ({createdAt: -1});
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const generateContent = async (req, res) => {
    try {
        const {prompt} = req.body;
        const content = await main(`
        Write a professional blog on "${prompt}".

        Format requirements:
        - Use markdown
        - Use ## for section headings
        - Leave one blank line between every paragraph
        - Leave one blank line after every heading
        - Use **bold** for important points
        - Use bullet points where appropriate
        - Do not write "Title:" or "Subtitle:"
        - Make it look like a published blog article
        `)
        res.json({success: true, content})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}