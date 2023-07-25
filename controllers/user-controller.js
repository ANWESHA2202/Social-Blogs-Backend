import User from '../model/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find()
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: 'No users found' })
    }

    res.status(200).json({ users })
}

export const signup = async(req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });

    } catch (err) {
        console.log(err);
        return err;
    }
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    })

    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return err;
    }

    return res.status(200).json({ message: `User created successfully ${user}` })
}

export const login = async(req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.log(err);
        return err
    }

    if (!existingUser) {
        return res.status(400).json({ message: 'User does not exist' })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }

    return res.status(200).json({ message: 'Logged in successfully' })
}