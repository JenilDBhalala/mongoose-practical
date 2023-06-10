"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    caption: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
        lowercase: true,
    },
    tags: {
        type: [String],
        lowercase: true,
    },
    comments: [
        {
            comment: {
                type: String,
            },
            commentBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                require: true,
                ref: "User",
            },
            commentDate: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
}, { timestamps: true });
exports.Post = mongoose_1.default.model("Post", postSchema);
