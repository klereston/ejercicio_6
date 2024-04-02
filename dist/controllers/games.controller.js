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
exports.rollDice = exports.getAllRolls = exports.deleteRolls = void 0;
const client_1 = require("@prisma/client");
//rollDice, deleteRolls, getAllRolls
//-----------Anunciado: ----------------------
// POST /games/{id}: un jugador/a específic realitza una tirada. (rollDice)
// DELETE /games/{id}: elimina les tirades del jugador/a.
// GET /games/{id}: retorna el llistat de jugades per un jugador/a.
const deleteRolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        const loggedInUserId = Number(req.body.user_id); //from token user.id
        //Find the user to get winnings games
        const findUserInDb = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: { id: loggedInUserId },
            });
        });
        //OP 2
        findUserInDb().then((user_db) => __awaiter(void 0, void 0, void 0, function* () {
            if (user_db) {
                const getAllRollsFromUser = () => __awaiter(void 0, void 0, void 0, function* () {
                    return yield prisma.rollDice.deleteMany({
                        where: {
                            gamerId: loggedInUserId
                        }
                    });
                });
                getAllRollsFromUser().then((deletedRolls) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!exports.deleteRolls) {
                        throw new Error("Error in deleteRows");
                    }
                    const deleteRollsInUserDb = () => __awaiter(void 0, void 0, void 0, function* () {
                        //Update user successrate and winnings to 0%, 0 in db
                        return yield prisma.user.update({
                            select: {
                                fullName: true,
                                winnings: true,
                                successRate: true
                            },
                            where: {
                                id: loggedInUserId
                            },
                            data: {
                                winnings: 0,
                                successRate: 0
                            }
                        });
                    });
                    deleteRollsInUserDb().then((user) => __awaiter(void 0, void 0, void 0, function* () {
                        //Return user with no rolls in it, and the total of rolls deleted
                        res.status(201).json({ player: user, deletedRolls: deletedRolls });
                        yield prisma.$disconnect();
                    })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                        console.error(e);
                        res.status(400).json({ error: "Unknown Error in Delete/Update User Rolls" });
                        yield prisma.$disconnect();
                    }));
                })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                    console.error(e);
                    res.status(400).json({ error: "Unknown Error in RollDice" });
                    yield prisma.$disconnect();
                    //process.exit(1)
                }));
            }
            //Create id to EACH user!! IO.on create connection
            //socket.io listen what heppen to the connection server and client side
            //SOCKET IO, Send the message to other user here
            // const receiverSocketId = getReceiverSocketId(userToSendMsg)
            //io.to("broadcast").emit("newResultsOfRollDice", user)
            // res.status(201).json({user})
            // await prisma.$disconnect()
        })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
            console.error(e);
            res.status(400).json({ error: "Error can not find the user in db" });
            yield prisma.$disconnect();
            //process.exit(1)
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Error in deleteRolls" + error });
    }
});
exports.deleteRolls = deleteRolls;
const getAllRolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        const loggedInUserId = Number(req.body.user_id); //from token user.id
        //Find the user to get winnings games
        const findUserInDb = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: { id: loggedInUserId },
            });
        });
        //OP 2
        findUserInDb().then((user_db) => __awaiter(void 0, void 0, void 0, function* () {
            if (user_db) {
                const getAllRollsFromUser = () => __awaiter(void 0, void 0, void 0, function* () {
                    return yield prisma.rollDice.findMany({
                        select: {
                            id: true,
                            resultOfRoll1: true,
                            resultOfRoll2: true,
                            gamerId: true
                        },
                        where: {
                            gamerId: loggedInUserId
                        }
                    });
                });
                getAllRollsFromUser().then((rolls) => __awaiter(void 0, void 0, void 0, function* () {
                    res.status(201).json({ player: user_db.fullName, rolls: rolls });
                    yield prisma.$disconnect();
                })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                    console.error(e);
                    res.status(400).json({ error: "Unknown Error in RollDice" });
                    yield prisma.$disconnect();
                    //process.exit(1)
                }));
            }
            //Create id to EACH user!! IO.on create connection
            //socket.io listen what heppen to the connection server and client side
            //SOCKET IO, Send the message to other user here
            // const receiverSocketId = getReceiverSocketId(userToSendMsg)
            //io.to("broadcast").emit("newResultsOfRollDice", user)
            // res.status(201).json({user})
            // await prisma.$disconnect()
        })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
            console.error(e);
            res.status(400).json({ error: "Error can not find the user in db" });
            yield prisma.$disconnect();
            //process.exit(1)
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Error in getAllRolls" + error });
    }
});
exports.getAllRolls = getAllRolls;
const rollDice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        //const {rolldice1, rolldice2 } = req.body
        const rolldice1 = Math.floor(Math.random() * 6) + 1;
        const rolldice2 = Math.floor(Math.random() * 6) + 1;
        const loggedInUserId = Number(req.body.user_id); //from token user.id
        //Find the user to get winnings games
        const findUserInDb = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: { id: loggedInUserId },
            });
        });
        //OP 2
        findUserInDb().then((user_db) => __awaiter(void 0, void 0, void 0, function* () {
            //Create rolldice
            function sendResultRolldiceToDb() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield prisma.rollDice.create({
                        data: {
                            resultOfRoll1: rolldice1,
                            resultOfRoll2: rolldice2,
                            gamerId: loggedInUserId
                        }
                    });
                });
            }
            sendResultRolldiceToDb().then((rolldice) => __awaiter(void 0, void 0, void 0, function* () {
                if (rolldice) {
                    const count = yield prisma.rollDice.count({
                        where: {
                            gamerId: loggedInUserId
                        }
                    });
                    console.log("count: " + count);
                    const result = rolldice.resultOfRoll1 + rolldice.resultOfRoll2;
                    let winnings = user_db.winnings;
                    let percentageTotal = -1;
                    if (result >= 7) {
                        winnings += 1;
                        percentageTotal = winnings * 100 / count; //as 100 % 
                    }
                    if (result <= 6) {
                        percentageTotal = winnings * 100 / count; //as 100 % 
                    }
                    //Add and update this winner roll
                    if (percentageTotal !== -1) {
                        yield prisma.user.update({
                            select: {
                                fullName: true,
                                winnings: true,
                                successRate: true
                            },
                            where: {
                                id: loggedInUserId
                            },
                            data: {
                                winnings: winnings,
                                successRate: percentageTotal
                            }
                        });
                    }
                    res.status(201).json({ gamesWinner: winnings, userSuccessRate: percentageTotal });
                    yield prisma.$disconnect();
                }
                //Create id to EACH user!! IO.on create connection
                //socket.io listen what heppen to the connection server and client side
                //SOCKET IO, Send the message to other user here
                // const receiverSocketId = getReceiverSocketId(userToSendMsg)
                //io.to("broadcast").emit("newResultsOfRollDice", user)
                // res.status(201).json({user})
                // await prisma.$disconnect()
            })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                console.error(e);
                res.status(400).json({ error: "Unknown Error in RollDice" });
                yield prisma.$disconnect();
                //process.exit(1)
            }));
        })).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
            console.error(e);
            res.status(400).json({ error: "Error can not find the user in db" });
            yield prisma.$disconnect();
            //process.exit(1)
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Error in rollDice" + error });
    }
});
exports.rollDice = rollDice;
