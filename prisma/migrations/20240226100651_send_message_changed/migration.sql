/*
  Warnings:

  - You are about to drop the column `sendMessage` on the `Msg` table. All the data in the column will be lost.
  - Added the required column `sendMessageToUserId` to the `Msg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Msg` DROP COLUMN `sendMessage`,
    ADD COLUMN `sendMessageToUserId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `SendMessageToUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userToSend` VARCHAR(191) NOT NULL,
    `sendMessage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Msg` ADD CONSTRAINT `Msg_sendMessageToUserId_fkey` FOREIGN KEY (`sendMessageToUserId`) REFERENCES `SendMessageToUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
