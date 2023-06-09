import mongoose, { Document } from "mongoose";

// export interface IPost extends Document {
//   caption: string;
//   location: string;
//   tags: string[];
//   comments: {
//     comment: {
//       type: string;
//     };
//     commentBy: {
//       type: string;
//     };
//     commentDate: {
//       type: Date;
//     };
//   }[];
// }

export const postSchema = new mongoose.Schema(
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

export const Post = mongoose.model("Post", postSchema);
