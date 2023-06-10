import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  username?: string;
  email?: string;
  password?: string;
  age?: number;
  tokens?: { token: string }[];
  generateAuthToken?: () => Promise<string>;
  [key: string]: any;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: (value: string) => {
        if (!validator.isEmail(value)) throw new Error("email is not valid!");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: (value: string) => {
        if (value.toLowerCase().includes("password"))
          throw new Error("password can not contain word password!");
      },
    },
    age: {
      type: Number,
      required: true,
      trim: true,
      validate: (value: number) => {
        if (value <= 15) throw new Error("age must be greater than 15!");
      },
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

//hiding private data
userSchema.methods.toJSON = function () {
  const user = this;
  let userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//generating token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//encrypt password before saving it into database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 10);
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);
