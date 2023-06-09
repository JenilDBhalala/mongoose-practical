"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userService = require('../services/user.service');
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield userService.loginUser(req.body.email, req.body.password);
        res.status(200).json({ userData });
    }
    catch (err) {
        next(err);
    }
});
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService.logoutUser(req.user);
        res.status(200).json({ message: 'user logged out successfully' });
    }
    catch (err) {
        next(err);
    }
});
const createProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield userService.createProfile(req.body);
        res.status(201).json({ userData });
    }
    catch (err) {
        console.log("sdflksdflkjksdfdsffg-0---------sd-f4-3-4w5-34-");
        next(err);
    }
});
const viewProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ data: req.user });
});
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userService.updateProfile(req.body, req.user);
        res.status(200).json({ data: updatedUser });
    }
    catch (err) {
        next(err);
    }
});
const deleteProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService.deleteProfile(req.user);
        res.status(200).json({ message: 'user deleted successfully' });
    }
    catch (err) {
        next(err);
    }
});
module.exports = {
    createProfile,
    viewProfile,
    updateProfile,
    deleteProfile,
    loginUser,
    logoutUser
};
