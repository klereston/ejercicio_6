"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, password, fullName, winnings, successRate) {
        this.id = id;
        this.password = password;
        this.fullName = fullName;
        this.winnings = winnings;
        this.successRate = successRate;
    }
}
exports.User = User;
// id: number,
//     password: string,
//     fullName:string,
//     msg: Msg[]
