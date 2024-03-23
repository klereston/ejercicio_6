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
exports.getAllPlayers = void 0;
const client_1 = require("@prisma/client");
// GET /players: retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.
const getAllPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        const loggedInUserId = Number(req.body.user_id); //from token user.id
        //fetch all user from the database
        const allUsers = yield prisma.user.findMany({ select: {
                fullName: true,
                successRate: true
            },
            // where: {
            //     NOT: { id: loggedInUserId }
            // }
        });
        res.status(200).json({ allPlayers: allUsers });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error in get users" });
    }
});
exports.getAllPlayers = getAllPlayers;
