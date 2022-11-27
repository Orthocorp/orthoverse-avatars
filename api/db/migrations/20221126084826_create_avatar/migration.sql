/*
  Warnings:

  - You are about to drop the `Avatars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Avatars";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Avatar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_address_key" ON "Avatar"("address");
