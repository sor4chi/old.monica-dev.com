/*
  Warnings:

  - Added the required column `happenedAt` to the `Timeline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Timeline` ADD COLUMN `happenedAt` DATETIME(3) NOT NULL;
