import express from "express";
//import { createServer } from "node:http"

import cors from 'cors'
import authRoutes from "./routes/auth.routes"
import gamesRoutes from "./routes/games.routes"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/player.routes"
import rankingRoutes from "./routes/ranking.routes";

//Server port
const PORT = process.env.PORT || 5000

//Express
const app = express()
//const server = createServer(app)

// middleware transform the req.body to json
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded()) 
app.use(express.static('public'))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/games", gamesRoutes)
app.use("/api/players", userRoutes)
app.use("/api/ranking", rankingRoutes)

//Methods get and post
app.get('/', (_req, res) => {
  res.status(200).send(`<h1>hola mundo!</h1>`)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



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

//GIT REPO https://github.com/klereston/ejercicio_6