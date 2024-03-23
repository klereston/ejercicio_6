"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const connectToPrismaDB = () => {
    try {
        return new client_1.PrismaClient();
    }
    catch (error) {
        console.log("Error connecting to Prisma", error);
    }
};
exports.default = connectToPrismaDB;
