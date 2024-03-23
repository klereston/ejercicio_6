import express from 'express'
import protectRoute from '../middleware/protectRoute'
import { getRankingAllPlayers, getLoserRankingPlayer, getWinnerRankingPlayer } from '../controllers/ranking.controller'

const router = express.Router()

router.get('/', protectRoute, getRankingAllPlayers)
router.get('/loser', protectRoute, getLoserRankingPlayer)
router.get('/winner', protectRoute, getWinnerRankingPlayer)

export default router

// GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
// GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
// GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.