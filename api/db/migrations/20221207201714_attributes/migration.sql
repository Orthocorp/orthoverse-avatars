-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "authDetailId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "attributes" TEXT NOT NULL DEFAULT '{}',
    CONSTRAINT "User_authDetailId_fkey" FOREIGN KEY ("authDetailId") REFERENCES "AuthDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("address", "authDetailId", "id", "image", "level", "name") SELECT "address", "authDetailId", "id", "image", "level", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
