const User = require('../models/users.model')
const Post = require('../models/posts.model')
const bcrypt = require('bcryptjs')
const { UnauthorizedError, BadRequest } = require('../error')


const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthorizedError('Invalid Credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const token = await user.generateAuthToken();
    return { user, token };
}


const logoutUser = async (user, token) => {
    user.tokens = user.tokens.filter((token) => { token.token != token });
    await user.save();
}


const createProfile = async (body) => {
    const user = await User.create(body);
    const token = await user.generateAuthToken()
    return { user, token };
}


const updateProfile = async (body, user) => {
    const allowedUpdates = ['username', 'email', 'password', 'age'];
    const updates = Object.keys(body);

    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        throw BadRequest('Invalid Update')
    }

    updates.forEach((update) => {
        user[update] = body[update];
    })
    await user.save();

    return user;
}


const deleteProfile = async (user) => {
    await Post.deleteMany({ postedBy: user._id })
    await User.deleteOne({ email: user.email })
}


module.exports = {
    createProfile,
    updateProfile,
    deleteProfile,
    loginUser,
    logoutUser
}