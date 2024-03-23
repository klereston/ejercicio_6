"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const ranking_controller_1 = require("../controllers/ranking.controller");
const router = express_1.default.Router();
router.get('/', protectRoute_1.default, ranking_controller_1.getRankingAllPlayers);
router.get('/loser', protectRoute_1.default, ranking_controller_1.getLoserRankingPlayer);
router.get('/winner', protectRoute_1.default, ranking_controller_1.getWinnerRankingPlayer);
exports.default = router;
// GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
// GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
// GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.
