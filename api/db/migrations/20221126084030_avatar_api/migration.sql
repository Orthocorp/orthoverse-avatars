-- CreateTable
CREATE TABLE "Avatars" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatars_address_key" ON "Avatars"("address");
