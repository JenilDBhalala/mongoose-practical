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
exports.deleteProfile = exports.updateProfile = exports.viewProfile = exports.createProfile = exports.logoutUser = exports.loginUser = void 0;
const userService = __importStar(require("../services/user.service"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userService.loginUser(req.body.email, req.body.password);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService.logoutUser(req.user, req.token);
        res.status(200).json({ message: 'user logged out successfully' });
    }
    catch (err) {
        next(err);
    }
});
exports.logoutUser = logoutUser;
const createProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userService.createProfile(req.body);
        res.status(201).json({ data });
    }
    catch (err) {
        next(err);
    }
});
exports.createProfile = createProfile;
const viewProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ data: req.user });
});
exports.viewProfile = viewProfile;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userService.updateProfile(req.body, req.user);
        res.status(200).json({ data: updatedUser });
    }
    catch (err) {
        next(err);
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService.deleteProfile(req.user);
        res.status(200).json({ message: 'user deleted successfully' });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProfile = deleteProfile;
