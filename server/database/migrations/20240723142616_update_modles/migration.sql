/*
  Warnings:

  - The primary key for the `authSessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `username` on the `authSessions` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userUid` to the `authSessions` table without a default value. This is not possible if the table is not empty.
  - The required column `uid` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "authSessions" DROP CONSTRAINT "authSessions_pkey",
DROP COLUMN "username",
ADD COLUMN     "userUid" TEXT NOT NULL,
ADD CONSTRAINT "authSessions_pkey" PRIMARY KEY ("userUid", "token");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "uid" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
