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
exports.getWinnerRankingPlayer = exports.getLoserRankingPlayer = exports.getRankingAllPlayers = void 0;
const client_1 = require("@prisma/client");
// GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
// GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
// GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.
const getRankingAllPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        //const loggedInUserId = Number(req.body.user_id) //from token user.id
        //Get the user with highest rate from db
        const usersMaxToMinRate = yield prisma.$queryRaw `
            SELECT fullName, successRate FROM User
            ORDER BY successRate DESC
        `;
        const usersAVGRate = yield prisma.$queryRaw `
            SELECT AVG(successRate) AS AvgSuccessRate FROM User;
        `;
        res.status(200).json({ usersMaxToMinRate: usersMaxToMinRate, usersAVGRate: usersAVGRate });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in get users" });
    }
});
exports.getRankingAllPlayers = getRankingAllPlayers;
const getLoserRankingPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        //const loggedInUserId = Number(req.body.user_id) //from token user.id
        //Get the user with highest rate from db
        const user = yield prisma.$queryRaw `
            SELECT * FROM User
            WHERE successRate = (SELECT MIN(successRate) AS MinimoSuccessRate FROM User);
        `;
        res.status(200).json({ userMinRate: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in get users" });
    }
});
exports.getLoserRankingPlayer = getLoserRankingPlayer;
const getWinnerRankingPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        //const loggedInUserId = Number(req.body.user_id) //from token user.id
        //Get the user with highest rate from db
        const user = yield prisma.$queryRaw `
            SELECT * FROM User
            WHERE successRate = (SELECT MAX(successRate) AS HighestSuccessRate FROM User);
        `;
        res.status(200).json({ userMaxRate: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in get users" });
    }
});
exports.getWinnerRankingPlayer = getWinnerRankingPlayer;
