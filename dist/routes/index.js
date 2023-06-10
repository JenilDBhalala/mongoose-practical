"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRoutes = exports.postRoutes = exports.userRoutes = void 0;
const user_route_1 = __importDefault(require("./user.route"));
exports.userRoutes = user_route_1.default;
const post_route_1 = __importDefault(require("./post.route"));
exports.postRoutes = post_route_1.default;
const query_route_1 = __importDefault(require("./query.route"));
exports.queryRoutes = query_route_1.default;
// export * as userRoutes from './user.route'
// export * as postRoutes from './user.route'
// export * as queryRoutes from './user.route'
