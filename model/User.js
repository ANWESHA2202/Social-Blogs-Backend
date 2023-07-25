import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20,

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
    }]
})

export default mongoose.model('User', userSchema)