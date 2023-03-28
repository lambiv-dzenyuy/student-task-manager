/*
  Warnings:

  - Added the required column `avatar` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Student` ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL;
