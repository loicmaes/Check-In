-- DropForeignKey
ALTER TABLE "authSessions" DROP CONSTRAINT "authSessions_userUid_fkey";

-- AddForeignKey
ALTER TABLE "authSessions" ADD CONSTRAINT "authSessions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
