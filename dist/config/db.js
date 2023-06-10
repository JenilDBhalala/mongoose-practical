"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connectToDB() {
    mongoose_1.default
        .connect(process.env.CONNECTION_STRING)
        .then(() => {
        console.log("database connected succesfully");
    })
        .catch((err) => console.log(err.message, "connection failed!"));
}
exports.connectToDB = connectToDB;
