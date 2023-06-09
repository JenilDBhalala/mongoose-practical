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
const queryService = require('../services/query.service');
//finding latest comments using aggregate pipeline with pagination, sorting and projection
const findLatestComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield queryService.findLatestComments(req.params, req.query);
        res.status(200).json({ data: comments });
    }
    catch (err) {
        next(err);
    }
});
const searchByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield queryService.searchByUsername(req.query);
        res.status(200).json({ data: users });
    }
    catch (err) {
        next(err);
    }
});
//finding counts of post with specific tag 
const countOfPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield queryService.countOfPosts();
        res.status(200).json({ data: posts });
    }
    catch (err) {
        next(err);
    }
});
module.exports = {
    findLatestComments,
    searchByUsername,
    countOfPosts
};
