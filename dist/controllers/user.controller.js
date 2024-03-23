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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserForSideBar = void 0;
const client_1 = require("@prisma/client");
// import jwt from 'jsonwebtoken'
// import { User } from "../models/user.model"
const JWT_SECRET = "ASD123";
const getUserForSideBar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        //const {id: userToChatId} = req.params
        const loggedInUserId = Number(req.body.user_id); //from token user.id
        //fetch all user from the database
        // const allUsers = await prisma.user.findMany(
        //     {
        //         where: {
        //             NOT: { id: loggedInUserId }
        //         }
        //     }
        // )
        const usersMessagesSended = yield prisma.$queryRaw `
            SELECT DISTINCT userToSend
            FROM Msg
            INNER JOIN SendMessageToUser ON Msg.sendMessageToUserId=SendMessageToUser.id
            WHERE authorId = ${loggedInUserId} AND SendMessageToUser.id > 1
        ;`;
        const usersReceivedMessages = yield prisma.$queryRaw `
            SELECT DISTINCT whoSend
            FROM Msg
            INNER JOIN ReceivedMessageFromUser ON Msg.receivedMessageId=ReceivedMessageFromUser.id
            WHERE authorId = ${loggedInUserId} AND ReceivedMessageFromUser.id > 1
        ;`;
        res.status(200).json({ usersMessagesSended: usersMessagesSended, usersReceivedMessages: usersReceivedMessages });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in get users" });
    }
});
exports.getUserForSideBar = getUserForSideBar;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        //const {id: userToChatId} = req.params
        const loggedInUserId = Number(req.body.user_id); //from token user.id
        //fetch all user from the database
        const allUsers = yield prisma.user.findMany({
            where: {
                NOT: { id: loggedInUserId }
            }
        });
        res.status(200).json({ allUsers: allUsers });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in get users" });
    }
});
exports.getAllUsers = getAllUsers;
