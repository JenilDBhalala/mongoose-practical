var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { User } from "../models";
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = yield User.findOne({
            _id: decoded.id,
            "tokens.token": token,
        });
        if (!user) {
            return res.status(401).json({ error: "Please Authenticate!" });
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (err) {
        next(err);
    }
});
module.exports = auth;
