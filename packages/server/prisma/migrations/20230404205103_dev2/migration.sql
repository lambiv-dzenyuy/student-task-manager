/*
  Warnings:

  - Made the column `password` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Student` MODIFY `password` VARCHAR(191) NOT NULL;
