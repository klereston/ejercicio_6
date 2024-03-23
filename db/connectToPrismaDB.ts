import { PrismaClient } from '@prisma/client'

const connectToPrismaDB = () => {
    try {
        return new PrismaClient()
    } catch (error) {
        console.log("Error connecting to Prisma", error)
    }
}

export default connectToPrismaDB