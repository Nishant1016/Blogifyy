import express from "express";
import upload from "../middlewares/multer.js";
import userAuth from "../middlewares/userAuth.js";

import {
    getUserBlogs,
    addUserBlog,
    getUserBlogById,
    updateUserBlog,
    deleteUserBlog
} from "../controllers/userBlogController.js";


const userBlogRouter = express.Router();


// Blogs created by the authenticated user are returned.
userBlogRouter.get(
    "/my-blogs",
    userAuth,
    getUserBlogs
);


// A new unpublished blog is created for the authenticated user.
userBlogRouter.post(
    "/add",
    userAuth,
    upload.single("image"),
    addUserBlog
);


// A single user-owned blog is returned for editing.
userBlogRouter.get(
    "/:id",
    userAuth,
    getUserBlogById
);


// A user-owned blog is updated and returned to an unpublished state.
userBlogRouter.put(
    "/update/:id",
    userAuth,
    upload.single("image"),
    updateUserBlog
);


// A user-owned blog is deleted.
userBlogRouter.post(
    "/delete",
    userAuth,
    deleteUserBlog
);


export default userBlogRouter;