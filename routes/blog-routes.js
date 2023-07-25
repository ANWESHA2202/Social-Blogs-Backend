import express from 'express';
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, getBlogsByUserId } from '../controllers/blog-controller.js';
const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
blogRouter.get('/:id', getBlogById);
blogRouter.post('/createblog', createBlog);
blogRouter.put('/updateblog/:id', updateBlog);
blogRouter.delete('/deleteblog/:id', deleteBlog);
blogRouter.get('/user/:id', getBlogsByUserId);

export default blogRouter;