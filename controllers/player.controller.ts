import { PrismaClient } from "@prisma/client"

// GET /players: retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.
export const getAllPlayers = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        const loggedInUserId = Number(req.body.user_id) //from token user.id


        //fetch all user from the database
        const allUsers = await prisma.user.findMany(
            {   select: {
                    fullName: true,
                    successRate: true
                },
                // where: {
                //     NOT: { id: loggedInUserId }
                // }
            }
        )

        res.status(200).json({allPlayers:allUsers})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error in get users" })
    }
}