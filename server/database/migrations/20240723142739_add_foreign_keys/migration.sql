-- AddForeignKey
ALTER TABLE "authSessions" ADD CONSTRAINT "authSessions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
