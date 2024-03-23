/*
  Warnings:

  - A unique constraint covering the columns `[fullName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `fullName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_password_key` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `fullName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_fullName_key` ON `User`(`fullName`);
