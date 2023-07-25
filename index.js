import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';


const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);
mongoose.connect(`mongodb+srv://anweshasanyal22:gs2qoyPHCAylhEqn@cluster0.5ls3ydw.mongodb.net/Blog?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    }).then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log(err, 'error');
    });