/*
  Warnings:

  - You are about to drop the column `content` on the `Msg` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Msg` DROP COLUMN `content`,
    ADD COLUMN `receivedMessage` VARCHAR(191) NULL,
    ADD COLUMN `sendMessage` VARCHAR(191) NULL;
