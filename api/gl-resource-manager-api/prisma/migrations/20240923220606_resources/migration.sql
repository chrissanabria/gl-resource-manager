-- CreateTable
CREATE TABLE "resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "hiredate" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL
);
