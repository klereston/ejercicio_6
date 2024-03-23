"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const router = express_1.default.Router();
//Create controlers with the functions (req, res)
router.get('/send/:id', protectRoute_1.default, message_controller_1.getMessages);
router.post('/send/:id', protectRoute_1.default, message_controller_1.sendMessage);
//-------------------------------------------
exports.default = router;
//-----------Anunciado: ----------------------
// POST /players: crea un jugador/a.
// PUT /players/{id}: modifica el nom del jugador/a.
// GET /players: retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.
// POST /games/{id}: un jugador/a específic realitza una tirada.
// DELETE /games/{id}: elimina les tirades del jugador/a.
// GET /games/{id}: retorna el llistat de jugades per un jugador/a.
// GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
// GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
// GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.
//---------------------------
