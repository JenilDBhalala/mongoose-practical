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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController = __importStar(require("../controllers/post.controller"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get("/", auth_1.auth, postController.fetchAllPosts);
router.get("/:id", auth_1.auth, postController.fetchPostById);
router.post("/", auth_1.auth, postController.addPost);
router.patch("/:id", auth_1.auth, postController.updatePost);
router.delete("/:id", auth_1.auth, postController.deletePost);
//routes related to comments
router.patch("/:id/comment", auth_1.auth, postController.addComment);
router.get("/:id/comment", auth_1.auth, postController.fetchAllCommentsOnPost);
exports.default = router;
