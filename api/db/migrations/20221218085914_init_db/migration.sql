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

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "authDetailId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "attributes" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthDetail" (
    "id" SERIAL NOT NULL,
    "nonce" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthDetail_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_authDetailId_key" ON "User"("authDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authDetailId_fkey" FOREIGN KEY ("authDetailId") REFERENCES "AuthDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
