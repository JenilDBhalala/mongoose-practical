const userService = require('../services/user.service');

const loginUser = async (req, res, next) => {
    try {
        const userData = await userService.loginUser(req.body.email, req.body.password);
        res.status(200).json({ userData })
    }
    catch (err) {
        next(err)
    }
}


const logoutUser = async (req, res, next) => {
    try {
        await userService.logoutUser(req.user);
        res.status(200).json({ message: 'user logged out successfully' })
    }
    catch (err) {
        next(err)
    }
}


const createProfile = async (req, res, next) => {
    try {
        const userData = await userService.createProfile(req.body);
        res.status(201).json({ userData });
    }
    catch (err) {
        console.log("sdflksdflkjksdfdsffg-0---------sd-f4-3-4w5-34-")
        next(err)
    }
}


const viewProfile = async (req, res, next) => {
    res.status(200).json({ data: req.user })
}


const updateProfile = async (req, res, next) => {
    try{
        const updatedUser = await userService.updateProfile(req.body, req.user)
        res.status(200).json({ data: updatedUser });
    }
    catch (err) {
        next(err)
    }
}


const deleteProfile = async (req, res, next) => {
    try {
        await userService.deleteProfile(req.user);
        res.status(200).json({ message: 'user deleted successfully' })
    }
    catch (err) {
        next(err)
    }
}


module.exports = {
    createProfile,
    viewProfile,
    updateProfile,
    deleteProfile,
    loginUser,
    logoutUser
}