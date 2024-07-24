-- CreateTable
CREATE TABLE "users" (
    "username" VARCHAR(24) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "authSessions" (
    "username" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authSessions_pkey" PRIMARY KEY ("username","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
