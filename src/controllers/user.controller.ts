import { Request, Response, NextFunction } from "express";
import { RequestWithUserAndToken } from "../middlewares/auth";
import * as userService from "../services/user.service";
import { IUser } from "../models/users.model";

export const loginUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const data = await userService.loginUser(req.body.email, req.body.password);
        res.status(200).json({ data })
    }
    catch (err) {
        next(err)
    }
}


export const logoutUser = async (req:RequestWithUserAndToken, res:Response, next:NextFunction) => {
    try {
        await userService.logoutUser(req.user as IUser, req.token as string);
        res.status(200).json({ message: 'user logged out successfully' })
    }
    catch (err) {
        next(err)
    }
}


export const createProfile = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const data = await userService.createProfile(req.body);
        res.status(201).json({ data });
    }
    catch (err) {
        next(err)
    }
}


export const viewProfile = async (req: RequestWithUserAndToken, res:Response, next:NextFunction) => {
    res.status(200).json({ data: req.user })
}


export const updateProfile = async (req: RequestWithUserAndToken, res:Response, next:NextFunction) => {
    try{
        const updatedUser = await userService.updateProfile(req.body, req.user as IUser)
        res.status(200).json({ data: updatedUser });
    }
    catch (err) {
        next(err)
    }
}


export const deleteProfile = async (req:RequestWithUserAndToken, res:Response, next:NextFunction) => {
    try {
        await userService.deleteProfile(req.user as IUser);
        res.status(200).json({ message: 'user deleted successfully' })
    }
    catch (err) {
        next(err)
    }
}