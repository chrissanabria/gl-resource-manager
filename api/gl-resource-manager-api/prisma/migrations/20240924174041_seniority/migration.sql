/*
  Warnings:

  - Added the required column `seniorityId` to the `resource` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "seniority" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL,
    "hiredate" DATETIME NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "practiceId" INTEGER NOT NULL,
    "seniorityId" INTEGER NOT NULL,
    CONSTRAINT "resource_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "practice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resource_seniorityId_fkey" FOREIGN KEY ("seniorityId") REFERENCES "seniority" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_resource" ("birthdate", "hiredate", "id", "isAvailable", "lastname", "name", "practiceId") SELECT "birthdate", "hiredate", "id", "isAvailable", "lastname", "name", "practiceId" FROM "resource";
DROP TABLE "resource";
ALTER TABLE "new_resource" RENAME TO "resource";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
