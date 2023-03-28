/*
  Warnings:

  - You are about to drop the column `attributes` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "attributes",
ADD COLUMN     "cape" TEXT NOT NULL DEFAULT 'cape_invisible.png';
