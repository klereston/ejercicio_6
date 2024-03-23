import express from 'express'
import { login, logout, signup, update } from '../controllers/auth.controllers'
import protectRoute from '../middleware/protectRoute'

const router = express.Router()

//Create controlers with the functions (req, res)
router.post('/players/signup', signup)
router.post('/players/login', login)  
router.post('/players/update', protectRoute, update) 
router.post('/players/logout', logout)
//-------------------------------------------

export default router

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