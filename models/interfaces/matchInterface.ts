import { User } from "../user.model"
export interface MatchInterface { 
    id: number
    resultOfRoll1: number
    resultOfRoll2: number
    gamer: User
}