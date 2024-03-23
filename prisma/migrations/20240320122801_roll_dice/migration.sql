/*
  Warnings:

  - You are about to drop the `Msg` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReceivedMessageFromUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SendMessageToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `successRate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Msg` DROP FOREIGN KEY `Msg_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Msg` DROP FOREIGN KEY `Msg_receivedMessageId_fkey`;

-- DropForeignKey
ALTER TABLE `Msg` DROP FOREIGN KEY `Msg_sendMessageToUserId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `successRate` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `Msg`;

-- DropTable
DROP TABLE `ReceivedMessageFromUser`;

-- DropTable
DROP TABLE `SendMessageToUser`;

-- CreateTable
CREATE TABLE `RollDice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resultOfRoll1` INTEGER NOT NULL,
    `resultOfRoll2` INTEGER NOT NULL,
    `gamerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resultOfRoll1` INTEGER NOT NULL,
    `resultOfRoll2` INTEGER NOT NULL,
    `gamerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RollDice` ADD CONSTRAINT `RollDice_gamerId_fkey` FOREIGN KEY (`gamerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_gamerId_fkey` FOREIGN KEY (`gamerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
