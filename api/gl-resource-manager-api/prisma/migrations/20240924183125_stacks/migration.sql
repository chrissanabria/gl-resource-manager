/*
  Warnings:

  - You are about to drop the column `resourceId` on the `favorite_user_resource` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `favorite_user_resource` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `resource` table. All the data in the column will be lost.
  - You are about to drop the column `practiceId` on the `resource` table. All the data in the column will be lost.
  - You are about to drop the column `seniorityId` on the `resource` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user_role` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_role` table. All the data in the column will be lost.
  - Added the required column `resource_id` to the `favorite_user_resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `favorite_user_resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_available` to the `resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practice_id` to the `resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seniority_id` to the `resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_role` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "resource_stack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resource_id" INTEGER NOT NULL,
    "stack_id" INTEGER NOT NULL,
    "is_primary" BOOLEAN NOT NULL,
    "stack_level_id" INTEGER NOT NULL,
    CONSTRAINT "resource_stack_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resource_stack_stack_id_fkey" FOREIGN KEY ("stack_id") REFERENCES "stack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resource_stack_stack_level_id_fkey" FOREIGN KEY ("stack_level_id") REFERENCES "stack_level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "stack_level" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_favorite_user_resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "resource_id" INTEGER NOT NULL,
    CONSTRAINT "favorite_user_resource_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favorite_user_resource_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_favorite_user_resource" ("id") SELECT "id" FROM "favorite_user_resource";
DROP TABLE "favorite_user_resource";
ALTER TABLE "new_favorite_user_resource" RENAME TO "favorite_user_resource";
CREATE TABLE "new_resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL,
    "hiredate" DATETIME NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "practice_id" INTEGER NOT NULL,
    "seniority_id" INTEGER NOT NULL,
    CONSTRAINT "resource_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resource_seniority_id_fkey" FOREIGN KEY ("seniority_id") REFERENCES "seniority" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_resource" ("birthdate", "hiredate", "id", "lastname", "name") SELECT "birthdate", "hiredate", "id", "lastname", "name" FROM "resource";
DROP TABLE "resource";
ALTER TABLE "new_resource" RENAME TO "resource";
CREATE TABLE "new_user_role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_role" ("id") SELECT "id" FROM "user_role";
DROP TABLE "user_role";
ALTER TABLE "new_user_role" RENAME TO "user_role";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
