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
exports.getMessages = exports.sendMessage = void 0;
const msg_model_1 = require("../models/msg.model");
const client_1 = require("@prisma/client");
const user_model_1 = require("../models/user.model");
const sendmsg_model_1 = require("../models/sendmsg.model");
const receivedmsg_model_1 = require("../models/receivedmsg.model");
const server_1 = require("../server");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        const { message } = req.body;
        const { id: userToSendMsg } = req.params;
        //const user: User = req.user
        //const senderId = user.id   //from token user.id
        const loggedInUserId = Number(req.body.user_id); //from token user.id
        const findUser = () => __awaiter(void 0, void 0, void 0, function* () {
            const user_db = yield prisma.user.findUnique({
                where: {
                    id: loggedInUserId
                }
            });
            if (user_db) {
                const user = new user_model_1.User(user_db.id, user_db.password, user_db.fullName, []);
                console.log("soy el puto user: " + user);
                //Find the userToChat in db
                const findUserToChatInDb = () => __awaiter(void 0, void 0, void 0, function* () {
                    const userexist = yield prisma.user.findUnique({
                        where: {
                            fullName: userToSendMsg
                        }
                    });
                    if (!(userexist)) {
                        console.log("User to chat not in database");
                    }
                    console.log({ id: userexist === null || userexist === void 0 ? void 0 : userexist.id, fullName: userexist === null || userexist === void 0 ? void 0 : userexist.fullName });
                    return userexist;
                });
                yield findUserToChatInDb()
                    .then((u) => __awaiter(void 0, void 0, void 0, function* () {
                    //create new user userToChat
                    if (u) {
                        const userToChat = new user_model_1.User(u.id, u.password, u.fullName, []);
                        //Saving My Own message sended in current USER db
                        function sendMsgToDb() {
                            return __awaiter(this, void 0, void 0, function* () {
                                const sendMessageToUser = new sendmsg_model_1.SendMsg(userToChat.fullName, message);
                                yield prisma.sendMessageToUser.create({
                                    data: {
                                        //id: 0,//msg.id,
                                        userToSend: sendMessageToUser.userToSend,
                                        sendMessage: sendMessageToUser.sendMessage
                                    }
                                });
                                return sendMessageToUser;
                            });
                        }
                        const messageSended = yield sendMsgToDb();
                        console.log("messageSended success");
                        //Saving Send message in the USER to chat db
                        function receivingMsgToDb() {
                            return __awaiter(this, void 0, void 0, function* () {
                                const receivedMessageFromUser = new receivedmsg_model_1.ReceivedMsg(user.fullName, message);
                                yield prisma.receivedMessageFromUser.create({
                                    data: {
                                        //id: 0,//msg.id,
                                        whoSend: receivedMessageFromUser.whoSend,
                                        receivedMessage: receivedMessageFromUser.receivedMessage
                                    }
                                });
                                return receivedMessageFromUser;
                            });
                        }
                        const messageReceived = yield receivingMsgToDb();
                        //find the id of the just created received msg
                        function findmessageReceivedIdInDb() {
                            return __awaiter(this, void 0, void 0, function* () {
                                const latestQuery = yield prisma.receivedMessageFromUser.findMany({
                                    orderBy: {
                                        id: 'desc',
                                    },
                                    take: 1,
                                });
                                console.log(latestQuery);
                                return latestQuery;
                            });
                        }
                        const latestMsgReceived = yield findmessageReceivedIdInDb();
                        console.log("this is the query latest msg received: " + latestMsgReceived[0].whoSend);
                        //send a new msg to the userTochat db
                        function createReceivedMsg(messageReceived) {
                            return __awaiter(this, void 0, void 0, function* () {
                                const msg = new msg_model_1.Msg(0, { userToSend: "", sendMessage: "" }, messageReceived, userToChat, userToChat.id);
                                console.log("this is msg from createMsg: " + msg.author.id);
                                yield prisma.msg.create({
                                    data: {
                                        //id: 0,//msg.id,
                                        sendMessageToUserId: 1, //1 the default message
                                        receivedMessageId: latestMsgReceived[0].id, //the id of the message send just created!
                                        authorId: msg.authorId,
                                    }
                                });
                                console.log("createReceivedMsg successfuly");
                                return msg;
                            });
                        }
                        yield createReceivedMsg(messageReceived)
                            .then((m) => __awaiter(void 0, void 0, void 0, function* () {
                            //res.status(201).json({m})
                            yield prisma.$disconnect();
                        }))
                            .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                            console.error(e);
                            res.status(400).json({ error: "Invalid msg data" });
                            yield prisma.$disconnect();
                            //process.exit(1)
                        }));
                        //send a new msg to my own db
                        function findmessageSendedIdInDb() {
                            return __awaiter(this, void 0, void 0, function* () {
                                const latestQuery = yield prisma.sendMessageToUser.findMany({
                                    orderBy: {
                                        id: 'desc',
                                    },
                                    take: 1,
                                });
                                console.log(latestQuery);
                                return latestQuery;
                            });
                        }
                        const latestMsgSended = yield findmessageSendedIdInDb();
                        console.log("this is the query latest msg send: " + latestMsgSended[0].userToSend);
                        function createSendMsg(messageSended) {
                            return __awaiter(this, void 0, void 0, function* () {
                                console.log("Show the value of: " + JSON.stringify(messageSended));
                                const msg = new msg_model_1.Msg(0, messageSended, { whoSend: "", receivedMessage: "" }, user, loggedInUserId /*authorId*/);
                                console.log("this is msg from createMsg: " + msg.author.fullName);
                                yield prisma.msg.create({
                                    data: {
                                        //id: 0,//msg.id,
                                        sendMessageToUserId: latestMsgSended[0].id, //the id of the message send just created!
                                        receivedMessageId: 1, //1 the default message
                                        authorId: loggedInUserId //msg.authorId,
                                    }
                                });
                                return msg;
                            });
                        }
                        yield createSendMsg(messageSended)
                            .then((m) => __awaiter(void 0, void 0, void 0, function* () {
                            //Create id to EACH user!! IO.on create connection
                            //socket.io listen what heppen to the connection server and client side
                            //SOCKET IO, Send the message to other user here
                            // const receiverSocketId = getReceiverSocketId(userToSendMsg)
                            server_1.io.to(m.sendMessageToUser.userToSend).emit("newMessage", m.sendMessageToUser.sendMessage);
                            res.status(201).json({ m });
                            yield prisma.$disconnect();
                        }))
                            .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                            console.error(e);
                            res.status(400).json({ error: "Invalid msg data" });
                            yield prisma.$disconnect();
                            //process.exit(1)
                        }));
                    }
                    else {
                        console.log("User to chat does not exist.");
                    }
                })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                    console.error(e);
                }));
            }
        });
        yield findUser().then()
            .catch((e) => {
            console.log("Error in logged user: " + e);
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error in message" + error });
    }
});
exports.sendMessage = sendMessage;
//Result (201).json(m):
// {
//     "m": {
//       "id": 0,
//       "sendMessageToUser": {
//         "userToSend": "Kaka",
//         "sendMessage": "Que pasa x3"
//       },
//       "receivedMessageFromUser": {
//         "whoSend": "",
//         "receivedMessage": ""
//       },
//       "author": {
//         "id": 40,
//         "password": "$2a$10$H8QcWKuonnEtZsuokc1f2uxOn4Prmg0wJem.WkGCt1Vl94BwcdYuW",
//         "fullName": "Pepetico1",
//         "msg": []
//       },
//       "authorId": 40
//     }
//   }
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        const { id: userToChatId } = req.params;
        const loggedInUserId = Number(req.body.user_id); //from token user.id
        const messagesSended = yield prisma.$queryRaw `
            SELECT SendMessageToUser.sendMessage
            FROM Msg
            INNER JOIN SendMessageToUser ON Msg.sendMessageToUserId=SendMessageToUser.id
                WHERE authorId = ${loggedInUserId} AND userToSend = ${userToChatId} AND SendMessageToUser.id > 1
            ;
        `;
        //console.log({messagesSended:messagesSended})
        const receivedMessages = yield prisma.$queryRaw `
            SELECT whoSend, ReceivedMessageFromUser.receivedMessage
            FROM Msg
            INNER JOIN ReceivedMessageFromUser ON Msg.receivedMessageId=ReceivedMessageFromUser.id
                WHERE authorId = ${loggedInUserId} AND whoSend = ${userToChatId} AND ReceivedMessageFromUser.id > 1
            ;
        `;
        console.log("message sended: " + messagesSended);
        res.status(200).json({ userId: loggedInUserId, chatWith: userToChatId, sendMessage: messagesSended, receivedMessage: receivedMessages });
    }
    catch (error) {
        res.status(500).json({ error: "Internal sever error" });
    }
});
exports.getMessages = getMessages;
//find the author send msgs in db
// async function findSendedMessagesInDbToUserFromUser() {
//     const m = await prisma.msg.findMany({
//         where: {
//             authorId: senderId
//         }
//     })
//     return m
// }
// const x = await findSendedMessagesInDbToUserFromUser()
// console.log(x.map((m)=>m))
// //find the messages between this two users
// //one is the actual user logged and the user to connect(send msg)
// //user to connect params
// //find the send msgs in db
// async function findSendedMessagesInDbToUser() {
//     const messagesSended = await prisma.sendMessageToUser.findMany({
//         where: {
//             userToSend: userToChatId
//         }
//     })
//     return messagesSended
// }
// //find the received msgs in db
// async function findReceivedMessagesInDbFromUser() {
//     const receivedMessages = await prisma.receivedMessageFromUser.findMany({
//         where: {
//             whoSend: userToChatId
//         }
//     })
//     return receivedMessages
// }
// const messagesSended = await findSendedMessagesInDbToUser()
// const receivedMessages = await findReceivedMessagesInDbFromUser()
//console.log(messagesSended.map((m)=>m))
