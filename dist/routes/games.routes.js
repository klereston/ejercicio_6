"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const games_controller_1 = require("../controllers/games.controller");
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const router = express_1.default.Router();
//Create controlers with the functions (req, res)
router.post('/rolldice', protectRoute_1.default, games_controller_1.rollDice);
router.delete('/deleterolls', protectRoute_1.default, games_controller_1.deleteRolls);
router.get('/allrolls', protectRoute_1.default, games_controller_1.getAllRolls);
//-------------------------------------------
exports.default = router;
//-----------Anunciado: ----------------------
// POST /games/{id}: un jugador/a específic realitza una tirada.
// DELETE /games/{id}: elimina les tirades del jugador/a.
// GET /games/{id}: retorna el llistat de jugades per un jugador/a.
