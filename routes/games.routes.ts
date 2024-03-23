import express from 'express'
import { rollDice, deleteRolls, getAllRolls } from '../controllers/games.controller'
import protectRoute from '../middleware/protectRoute'


const router = express.Router()

//Create controlers with the functions (req, res)
router.post('/rolldice', protectRoute, rollDice)
router.delete('/deleterolls', protectRoute, deleteRolls)
router.get('/allrolls', protectRoute, getAllRolls)
//-------------------------------------------

export default router

//-----------Anunciado: ----------------------
// POST /games/{id}: un jugador/a específic realitza una tirada.
// DELETE /games/{id}: elimina les tirades del jugador/a.
// GET /games/{id}: retorna el llistat de jugades per un jugador/a.

