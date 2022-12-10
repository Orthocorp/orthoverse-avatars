-- CreateTable
CREATE TABLE "land" (
    "tokenId" TEXT NOT NULL,
    "blockheight" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "special" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "adjustedheight" INTEGER NOT NULL,
    "owner" TEXT NOT NULL,
    "crest" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "land_pkey" PRIMARY KEY ("tokenId")
);

-- CreateTable
CREATE TABLE "escutcheons" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "escutcheons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "land_tokenId_key" ON "land"("tokenId");

-- CreateIndex
CREATE INDEX "coordinates_idx" ON "land"("x", "y");

-- CreateIndex
CREATE INDEX "name_idx" ON "land"("name");

-- CreateIndex
CREATE INDEX "owner_idx" ON "land"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "escutcheons_id_key" ON "escutcheons"("id");
