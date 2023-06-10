"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCommentsOnPost = exports.addComment = exports.deletePost = exports.updatePost = exports.addPost = exports.fetchPostById = exports.fetchAllPosts = void 0;
const postService = __importStar(require("../services/post.service"));
const fetchAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postService.fetchAllPosts(req.user);
        res.status(200).json({ data: posts });
    }
    catch (err) {
        next(err);
    }
});
exports.fetchAllPosts = fetchAllPosts;
const fetchPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postService.fetchPostById(req.user, req.params.id);
        res.status(200).json({ data: post });
    }
    catch (err) {
        next(err);
    }
});
exports.fetchPostById = fetchPostById;
const addPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postService.addPost(req.body, req.user);
        res.status(201).json({ data: post });
    }
    catch (err) {
        next(err);
    }
});
exports.addPost = addPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield postService.updatePost(req.body, req.params.id);
        res.status(200).json({ message: "Post updated successfully" });
    }
    catch (err) {
        next(err);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield postService.deletePost(req.user, req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (err) {
        next(err);
    }
});
exports.deletePost = deletePost;
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postService.addComment(req.params.id, req.body, req.user);
        res.status(200).json({ data: post });
    }
    catch (err) {
        next(err);
    }
});
exports.addComment = addComment;
const fetchAllCommentsOnPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield postService.fetchAllCommentsOnPost(req.params.id);
        res.status(200).json({ data: comments });
    }
    catch (err) {
        next(err);
    }
});
exports.fetchAllCommentsOnPost = fetchAllCommentsOnPost;
