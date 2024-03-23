"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollDice = void 0;
class RollDice {
    constructor(id, resultOfRoll1, resultOfRoll2, gamer) {
        this.id = id;
        this.resultOfRoll1 = resultOfRoll1;
        this.resultOfRoll2 = resultOfRoll2;
        this.gamer = gamer;
    }
}
exports.RollDice = RollDice;
// id: number
//     resultOfRoll1: number
//     resultOfRoll2: number
//     gamer: User
