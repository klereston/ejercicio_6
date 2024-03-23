"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "ASD123";
const generateTokenAndCookie = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, {
        expiresIn: '4h'
    });
    console.log("Token: " + token);
    res.cookie("jwt", token, {
        maxAge: 60 * 60 * 4,
        httpOnly: false, //prevent XSS attacks cross-site scripting attacks
        //sameSite: "strict" //CSRF attacks cross-site request forgery attacks
    });
    console.log("COOKIE CREADA");
};
exports.generateTokenAndCookie = generateTokenAndCookie;
