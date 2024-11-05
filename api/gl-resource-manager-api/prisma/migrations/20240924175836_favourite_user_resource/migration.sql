-- CreateTable
CREATE TABLE "favorite_user_resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    CONSTRAINT "favorite_user_resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favorite_user_resource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
