"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const router = express_1.default.Router();
//Create controlers with the functions (req, res)
router.post('/players/signup', auth_controllers_1.signup);
router.post('/players/login', auth_controllers_1.login);
router.post('/players/update', protectRoute_1.default, auth_controllers_1.update);
router.post('/players/logout', auth_controllers_1.logout);
//-------------------------------------------
exports.default = router;
//-----------Anunciado: ----------------------
// POST /players: crea un jugador/a. DONE!!!
// PUT /players/{id}: modifica el nom del jugador/a. DONE!!!
// POST /games/{id}: un jugador/a específic realitza una tirada.
// DELETE /games/{id}: elimina les tirades del jugador/a.
// GET /players: retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.
// GET /games/{id}: retorna el llistat de jugades per un jugador/a.
// GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
// GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
// GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.
//---------------------------
