/*
  Warnings:

  - You are about to drop the column `receivedMessage` on the `Msg` table. All the data in the column will be lost.
  - Added the required column `receivedMessageId` to the `Msg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Msg` DROP COLUMN `receivedMessage`,
    ADD COLUMN `receivedMessageId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ReceivedMessageFromUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `receivedMessage` VARCHAR(191) NULL,
    `whoSend` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Msg` ADD CONSTRAINT `Msg_receivedMessageId_fkey` FOREIGN KEY (`receivedMessageId`) REFERENCES `ReceivedMessageFromUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
