"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { createServer } from "node:http"
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const games_routes_1 = __importDefault(require("./routes/games.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const player_routes_1 = __importDefault(require("./routes/player.routes"));
const ranking_routes_1 = __importDefault(require("./routes/ranking.routes"));
//Server port
const PORT = process.env.PORT || 5000;
//Express
const app = (0, express_1.default)();
//const server = createServer(app)
// middleware transform the req.body to json
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded());
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/games", games_routes_1.default);
app.use("/api/players", player_routes_1.default);
app.use("/api/ranking", ranking_routes_1.default);
//Methods get and post
app.get('/', (_req, res) => {
    res.status(200).send(`<h1>hola mundo!</h1>`);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
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
