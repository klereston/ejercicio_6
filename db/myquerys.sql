
/*SELECT * FROM User
    WHERE fullName = "Pepetico1"
;*/

/*SELECT * FROM Msg
    WHERE authorId = 40
;*/

/*SELECT sendMessageToUserId FROM Msg
    WHERE authorId = 40
;*/


/*SELECT SendMessageToUser.sendMessage
FROM Msg
INNER JOIN SendMessageToUser ON Msg.sendMessageToUserId=SendMessageToUser.id
    WHERE authorId = 40 AND userToSend = "Pepe"
;*/

/*SELECT ReceivedMessageFromUser.id, ReceivedMessageFromUser.receivedMessage
FROM Msg
INNER JOIN ReceivedMessageFromUser ON Msg.receivedMessageId=ReceivedMessageFromUser.id
    WHERE authorId = 40 AND whoSend = "Kaka" AND ReceivedMessageFromUser.id > 1
;*/

/*SELECT * FROM SendMessageToUser;*/

/*SELECT * FROM SendMessageToUser
    WHERE userToSend = "Kaka"
;*/


/*DELETE FROM Msg;*/
/*DELETE FROM SendMessageToUser;*/
/*DELETE FROM ReceivedMessageFromUser;*/