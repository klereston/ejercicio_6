import { RollDiceInterface } from './interfaces/rolldiceInterface'
import { User } from './user.model'

export class RollDice implements RollDiceInterface {
    id: number
    resultOfRoll1: number
    resultOfRoll2: number
    gamer: User

    constructor( 
        id: number,
        resultOfRoll1: number,
        resultOfRoll2: number,
        gamer: User
        ){ 

        this.id = id
        this.resultOfRoll1 = resultOfRoll1;
        this.resultOfRoll2 = resultOfRoll2;
        this.gamer = gamer;
    }
    
}

// id: number
//     resultOfRoll1: number
//     resultOfRoll2: number
//     gamer: User