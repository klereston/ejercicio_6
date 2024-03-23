import { UserInterface } from "./interfaces/userInterface"

export class User implements UserInterface {
    id: number
    password: string
    fullName: string
    winnings: number
    successRate: number 
  

    constructor(id: number,password: string,fullName: string, winnings: number, successRate: number){
        this.id = id
        this.password = password
        this.fullName = fullName
        this.winnings = winnings
        this.successRate = successRate 
    }
}

// id: number,
//     password: string,
//     fullName:string,
//     msg: Msg[]