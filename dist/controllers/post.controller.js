var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const postService = require("../services/post.service");
const fetchAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postService.fetchAllPosts(req.user);
        res.status(200).json({ data: posts });
    }
    catch (err) {
        next(err);
    }
});
const fetchPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postService.fetchPostById(req.user, req.params.id);
        res.status(200).json({ data: post });
    }
    catch (err) {
        next(err);
    }
});
const addPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postService.addPost(req.body, req.user);
        res.status(201).json({ data: post });
    }
    catch (err) {
        next(err);
    }
});
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield postService.updatePost(req.body, req.params);
        res.status(200).json({ message: "Post updated successfully" });
    }
    catch (err) {
        next(err);
    }
});
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield postService.deletePost(req.user, req.params);
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (err) {
        next(err);
    }
});
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postService.addComment(req.params, req.body, req.user);
        res.status(200).json({ data: post });
    }
    catch (err) {
        next(err);
    }
});
const fetchAllCommentsOnPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield postService.fetchAllCommentsOnPost(req.params);
        res.status(200).json({ data: comments });
    }
    catch (err) {
        next(err);
    }
});
export {};
