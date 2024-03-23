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
exports.logout = exports.update = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import connectToPrismaDB from "../db/connectToPrismaDB"
const JWT_SECRET = "ASD123";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //INSTANCE DB
        const prisma = new client_1.PrismaClient();
        //REQUEST POST
        const { fullName, password } = req.body;
        //FIND USER DB
        const findUserInDb = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: { fullName: fullName },
            });
        });
        //OP 2
        findUserInDb().then((user_db) => __awaiter(void 0, void 0, void 0, function* () {
            if (!user_db) {
                //hash password
                const salt = yield bcryptjs_1.default.genSalt();
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                //create a new user in db if not exist
                function createUser() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const user = new user_model_1.User(0, hashedPassword, fullName, 0, 0);
                        yield prisma.user.create({
                            data: {
                                //id: 0,//user.id,
                                password: user.password,
                                fullName: user.fullName,
                                winnings: 0,
                                successRate: 0
                            }
                        });
                        return user;
                    });
                }
                yield createUser().then((user) => __awaiter(void 0, void 0, void 0, function* () {
                    const userForId = yield prisma.user.findFirst({
                        where: { fullName: user.fullName },
                    });
                    //Create user for Cookie
                    const user_id = userForId.id;
                    //Generate JWT Token
                    const token = jsonwebtoken_1.default.sign({ user_id }, JWT_SECRET, {
                        expiresIn: '4h'
                    });
                    res.cookie("jwtCookie", token, {
                        maxAge: 60 * 60 * 4 * 1000,
                        httpOnly: false, //prevent XSS attacks cross-site scripting attacks
                        //sameSite: "strict" //CSRF attacks cross-site request forgery attacks
                    });
                    res.status(201).json({ user });
                    yield prisma.$disconnect();
                })).catch((error) => {
                    console.log("Error in db", error);
                });
            }
            else {
                return res.status(400).json({ error: "User already exists" });
            }
        })).catch(() => __awaiter(void 0, void 0, void 0, function* () {
            res.status(400).json({ error: "Invalid user data" });
            yield prisma.$disconnect();
        })).finally(() => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.$disconnect();
        }));
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //INSTANCE DB
        const prisma = new client_1.PrismaClient();
        //REQUEST POST
        const { fullName, password } = req.body;
        //FIND USER DB
        const findUserInDb = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: { fullName: fullName },
            });
        });
        //OP 2
        findUserInDb().then((user_db) => __awaiter(void 0, void 0, void 0, function* () {
            const bc = yield bcryptjs_1.default.compare(password, (user_db === null || user_db === void 0 ? void 0 : user_db.password) || "");
            if (!(user_db && bc)) {
                return res.status(400).json({ error: "Invalid username or password" });
            }
            //Create user for Cookie
            const user = new user_model_1.User(user_db.id, user_db.password, user_db.fullName, user_db.winnings, user_db.successRate);
            const user_id = user.id;
            //Generate JWT Token and Cookie
            const token = jsonwebtoken_1.default.sign({ user_id }, JWT_SECRET, {
                expiresIn: '4h'
            });
            res.cookie("jwtCookie", token, {
                maxAge: 60 * 60 * 4 * 1000,
                httpOnly: false, //prevent XSS attacks cross-site scripting attacks
                sameSite: "none" //CSRF attacks cross-site request forgery attacks
            });
            res.status(200).json({ user });
        })).catch(() => __awaiter(void 0, void 0, void 0, function* () {
            res.status(400).json({ error: "Invalid user data" });
            yield prisma.$disconnect();
        })).finally(() => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.$disconnect();
        }));
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.login = login;
const update = (req, res) => {
    try {
        //INSTANCE DB
        const prisma = new client_1.PrismaClient();
        //REQUEST POST
        const { fullName } = req.body;
        //USER LOGGED
        const loggedInUserId = Number(req.body.user_id); //from token user.id
        //FIND USER IN DB
        const userLogged = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                select: {
                    fullName: true
                },
                where: {
                    id: loggedInUserId
                }
            });
        });
        userLogged().then(user => {
            console.log(user.fullName);
            //UPDATE USER DB
            const findUserInDbAndUpdate = () => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.user.update({
                    select: {
                        id: true,
                        password: true,
                        fullName: true,
                        winnings: true,
                        successRate: true
                    },
                    where: {
                        fullName: user.fullName
                    },
                    data: {
                        fullName: fullName
                    }
                });
            });
            //OP 2
            findUserInDbAndUpdate().then((user_db) => __awaiter(void 0, void 0, void 0, function* () {
                if (!(user_db)) {
                    return res.status(400).json({ error: "Invalid username" });
                }
                //Create user for Cookie
                const user = new user_model_1.User(user_db.id, user_db.password, user_db.fullName, user_db.winnings, user_db.successRate);
                const user_id = user.id;
                //Generate JWT Token and Cookie
                const token = jsonwebtoken_1.default.sign({ user_id }, JWT_SECRET, {
                    expiresIn: '4h'
                });
                res.cookie("jwtCookie", token, {
                    maxAge: 60 * 60 * 4 * 1000,
                    httpOnly: false, //prevent XSS attacks cross-site scripting attacks
                    sameSite: "none" //CSRF attacks cross-site request forgery attacks
                });
                //Return the user update
                res.status(200).json({ user });
            })).catch(() => __awaiter(void 0, void 0, void 0, function* () {
                res.status(400).json({ error: "Invalid user data" });
                yield prisma.$disconnect();
            })).finally(() => __awaiter(void 0, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.update = update;
const logout = (req, res) => {
    try {
        res.cookie("jwtCookie", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logout controller: " + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.logout = logout;
// const prismadb = async () => {
//     const allUsers = await prisma.user.findMany()
//     console.log(allUsers)
// }
// prismadb()
