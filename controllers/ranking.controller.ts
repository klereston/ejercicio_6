import { PrismaClient } from "@prisma/client"

// GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
// GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
// GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.

export const getRankingAllPlayers = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        //const loggedInUserId = Number(req.body.user_id) //from token user.id

        //Get the user with highest rate from db
        const usersMaxToMinRate = await prisma.$queryRaw`
            SELECT fullName, successRate FROM User
            ORDER BY successRate DESC
        `
        const usersAVGRate = await prisma.$queryRaw`
            SELECT AVG(successRate) AS AvgSuccessRate FROM User;
        `

        res.status(200).json({usersMaxToMinRate: usersMaxToMinRate, usersAVGRate: usersAVGRate})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error in get users" })
    }
} 


export const getLoserRankingPlayer = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        //const loggedInUserId = Number(req.body.user_id) //from token user.id

        //Get the user with highest rate from db
        const user = await prisma.$queryRaw`
            SELECT * FROM User
            WHERE successRate = (SELECT MIN(successRate) AS MinimoSuccessRate FROM User);
        `

        res.status(200).json({userMinRate: user})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error in get users" })
    }
}


export const getWinnerRankingPlayer = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        //const loggedInUserId = Number(req.body.user_id) //from token user.id

        //Get the user with highest rate from db
        const user = await prisma.$queryRaw`
            SELECT * FROM User
            WHERE successRate = (SELECT MAX(successRate) AS HighestSuccessRate FROM User);
        `

        res.status(200).json({userMaxRate: user})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error in get users" })
    }
} 