import Blog from '../model/Blog.js';
import User from '../model/User.js';

export const getAllBlogs = async(req, res, next) => {
    let blogs;

    try {
        blogs = await Blog.find();
    } catch (err) {
        return console.log(err);
    }

    if (!blogs) {
        return res.status(404).json({ message: 'No blogs found' })
    }

    return res.status(200).json({ blogs })
}

export const getBlogById = async(req, res, next) => {
    const blogId = req.params.id;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'No blog found' })
        }
        return res.status(200).json({ blog })
    } catch (err) {
        return console.log(err)
    }
}

export const createBlog = async(req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;

    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err)
    }
    if (!existingUser) return res.status(404).json({ message: 'User does not exist' })
    const blog = new Blog({
        title,
        description,
        image,
        user
    })

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }

    return res.status(200).json({ blog })
}

export const updateBlog = async(req, res, next) => {
    const blogId = req.params.id;
    const { title, description, image, user } = req.body;

    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
            image,
        });
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(404).json({ message: 'Failed to Update the blog' })
    }

    return res.status(200).json({ blog });
}

export const deleteBlog = async(req, res, next) => {
    const blogId = req.params.id;
    try {
        let blog = await Blog.findByIdAndDelete(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).json({ message: 'Blog deleted successfully' })
    } catch (err) {
        return console.log(err)
    }
}

export const getBlogsByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let userBlogs;

    try {
        userBlogs = await Blog.findById(userId).populate('blogs');
    } catch (err) {
        return console.log(err)
    }

    if (!userBlogs) {
        return res.status(404).json({ message: 'No blogs found' })
    }
    return res.status(200).json({ blogs: userBlogs })
}