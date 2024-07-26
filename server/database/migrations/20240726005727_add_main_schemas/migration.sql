-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('default', 'live');

-- CreateTable
CREATE TABLE "sessions" (
    "uid" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "projectUid" TEXT,
    "name" TEXT NOT NULL,
    "type" "SessionType" NOT NULL DEFAULT 'default',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "projects" (
    "uid" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_name_projectUid_key" ON "sessions"("name", "projectUid");

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_key" ON "projects"("name");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_projectUid_fkey" FOREIGN KEY ("projectUid") REFERENCES "projects"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
