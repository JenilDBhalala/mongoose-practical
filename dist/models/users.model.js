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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
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
        validate: (value) => {
            if (!validator_1.default.isEmail(value))
                throw new Error("email is not valid!");
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate: (value) => {
            if (value.toLowerCase().includes("password"))
                throw new Error("password can not contain word password!");
        },
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        validate: (value) => {
            if (value <= 15)
                throw new Error("age must be greater than 15!");
        },
    },
    tokens: [
        {
            token: {
                type: String,
            },
        },
    ],
}, { timestamps: true });
//hiding private data
userSchema.methods.toJSON = function () {
    const user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
//generating token
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
        user.tokens = user.tokens.concat({ token });
        yield user.save();
        return token;
    });
};
//encrypt password before saving it into database
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password"))
            user.password = yield bcryptjs_1.default.hash(user.password, 10);
        next();
    });
});
exports.User = mongoose_1.default.model("User", userSchema);
