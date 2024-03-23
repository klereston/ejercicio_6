"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Msg = void 0;
class Msg {
    constructor(id, sendMessageToUser, receivedMessageFromUser, author, authorId) {
        this.id = id;
        this.sendMessageToUser = sendMessageToUser;
        this.receivedMessageFromUser = receivedMessageFromUser;
        this.author = author;
        this.authorId = authorId;
    }
}
exports.Msg = Msg;
