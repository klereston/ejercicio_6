import { PrismaClient } from "@prisma/client"

//rollDice, deleteRolls, getAllRolls

//-----------Anunciado: ----------------------
// POST /games/{id}: un jugador/a específic realitza una tirada. (rollDice)
// DELETE /games/{id}: elimina les tirades del jugador/a.
// GET /games/{id}: retorna el llistat de jugades per un jugador/a.

export const deleteRolls:any = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        const loggedInUserId = Number(req.body.user_id) //from token user.id

        //Find the user to get winnings games
        const findUserInDb = async () => {
            return await prisma.user.findFirst({
                where: { id: loggedInUserId },
        })}

        //OP 2
        findUserInDb().then(async (user_db)=>{
            if(user_db){
                const getAllRollsFromUser = async () => {
                    return await prisma.rollDice.deleteMany({
                        where: {
                            gamerId: loggedInUserId
                        }
                    })
                }
                getAllRollsFromUser().then(async (deletedRolls)=>{
                    if(!deleteRolls){
                        throw new Error("Error in deleteRows")
                    }
                    const deleteRollsInUserDb = async () => {
                        //Update user successrate and winnings to 0%, 0 in db
                        return await prisma.user.update({
                            select: {
                                fullName: true,
                                winnings: true,
                                successRate: true
                            },
                            where: {
                                id: loggedInUserId 
                            },
                            data: {
                                winnings: 0,
                                successRate: 0
                            }
                        })
                    }
                    deleteRollsInUserDb().then(async (user)=>{
                        //Return user with no rolls in it, and the total of rolls deleted
                        res.status(201).json({player: user, deletedRolls: deletedRolls})
                        await prisma.$disconnect()
                    }).catch(async (e)=>{
                        console.error(e)
                        res.status(400).json({error: "Unknown Error in Delete/Update User Rolls"})
                        await prisma.$disconnect()
                    })

                }).catch(async (e) => {
                    console.error(e)
                    res.status(400).json({error: "Unknown Error in RollDice"})
                    await prisma.$disconnect()
                    //process.exit(1)
                })
            }
            
            //Create id to EACH user!! IO.on create connection
            //socket.io listen what heppen to the connection server and client side
                        
            //SOCKET IO, Send the message to other user here
            // const receiverSocketId = getReceiverSocketId(userToSendMsg)
                        
            //io.to("broadcast").emit("newResultsOfRollDice", user)
                        

            // res.status(201).json({user})
            // await prisma.$disconnect()
                
                    
            
        }).catch(async (e) => {
            console.error(e)
            res.status(400).json({error: "Error can not find the user in db"})
            await prisma.$disconnect()
            //process.exit(1)
        })
   
    } catch (error) {
        res.status(500).json({message: "Error in deleteRolls" + error})
    }
}


export const getAllRolls:any = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        const loggedInUserId = Number(req.body.user_id) //from token user.id

        //Find the user to get winnings games
        const findUserInDb = async () => {
            return await prisma.user.findFirst({
                where: { id: loggedInUserId },
        })}

        //OP 2
        findUserInDb().then(async (user_db)=>{
            if(user_db){
                const getAllRollsFromUser = async () => {
                    return await prisma.rollDice.findMany({
                        select: {
                            id: true,
                            resultOfRoll1: true,
                            resultOfRoll2: true,
                            gamerId: true
                        },
                        where: {
                            gamerId: loggedInUserId
                        }
                    })
                }
                getAllRollsFromUser().then(async (rolls)=>{
                    
                    
                    res.status(201).json({player: user_db.fullName, rolls: rolls})
                    await prisma.$disconnect()
                }).catch(async (e) => {
                    console.error(e)
                    res.status(400).json({error: "Unknown Error in RollDice"})
                    await prisma.$disconnect()
                    //process.exit(1)
                })
            }
            
            //Create id to EACH user!! IO.on create connection
            //socket.io listen what heppen to the connection server and client side
                        
            //SOCKET IO, Send the message to other user here
            // const receiverSocketId = getReceiverSocketId(userToSendMsg)
                        
            //io.to("broadcast").emit("newResultsOfRollDice", user)
                        

            // res.status(201).json({user})
            // await prisma.$disconnect()
                
                    
            
        }).catch(async (e) => {
            console.error(e)
            res.status(400).json({error: "Error can not find the user in db"})
            await prisma.$disconnect()
            //process.exit(1)
        })
   
    } catch (error) {
        res.status(500).json({message: "Error in getAllRolls" + error})
    }
}


export const rollDice: any = async (req: any, res: any) => {
    try {
        const prisma = new PrismaClient()
        //const {rolldice1, rolldice2 } = req.body
        const rolldice1 = Math.floor(Math.random() * 6) + 1 
        const rolldice2 = Math.floor(Math.random() * 6) + 1
        const loggedInUserId = Number(req.body.user_id) //from token user.id

        //Find the user to get winnings games
        const findUserInDb = async () => {
            return await prisma.user.findFirst({
                where: { id: loggedInUserId },
        })}

        //OP 2
        findUserInDb().then(async (user_db)=>{

            //Create rolldice
        async function sendResultRolldiceToDb() {
            return await prisma.rollDice.create({
                data: {
                        resultOfRoll1: rolldice1,
                        resultOfRoll2: rolldice2 ,
                        gamerId: loggedInUserId
                    }
            })
        }
        sendResultRolldiceToDb().then(async (rolldice) => {
            if(rolldice){
                const count = await prisma.rollDice.count({
                                    where: {
                                        gamerId: loggedInUserId
                                    }
                                })
        
                console.log("count: "+ count)
                const result = rolldice.resultOfRoll1 + rolldice.resultOfRoll2
                let winnings = user_db!.winnings
                let percentageTotal = -1
                
                if(result >= 7){ 
                    winnings += 1 
                    percentageTotal = winnings * 100 / count //as 100 % 
                }

                if(result <= 6){
                    percentageTotal = winnings * 100 / count //as 100 % 
                }

                //Add and update this winner roll
                if(percentageTotal !== -1){ 
                    await prisma.user.update({
                        select: {
                            fullName: true,
                            winnings: true,
                            successRate: true
                        },
                        where: {
                            id: loggedInUserId
                        },
                        data: {
                            winnings: winnings,
                            successRate: percentageTotal
                        }
                    })
                }

                res.status(201).json({ gamesWinner: winnings, userSuccessRate: percentageTotal })
                await prisma.$disconnect()     
            }
            
            //Create id to EACH user!! IO.on create connection
            //socket.io listen what heppen to the connection server and client side
                        
            //SOCKET IO, Send the message to other user here
            // const receiverSocketId = getReceiverSocketId(userToSendMsg)
                        
            //io.to("broadcast").emit("newResultsOfRollDice", user)
                        

            // res.status(201).json({user})
            // await prisma.$disconnect()
                
                    
            }).catch(async (e) => {
                        console.error(e)
                        res.status(400).json({error: "Unknown Error in RollDice"})
                        await prisma.$disconnect()
                        //process.exit(1)
                    })
        }).catch(async (e) => {
            console.error(e)
            res.status(400).json({error: "Error can not find the user in db"})
            await prisma.$disconnect()
            //process.exit(1)
        })
   
    } catch (error) {
        res.status(500).json({message: "Error in rollDice" + error})
    }
}

