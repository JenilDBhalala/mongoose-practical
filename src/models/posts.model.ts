import mongoose, { Document } from "mongoose";

export interface IPost extends Document {
  comments : object[]
}

export interface IComment {
  comment: string;
}

const postSchema = new mongoose.Schema(
  {
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
          type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema);
