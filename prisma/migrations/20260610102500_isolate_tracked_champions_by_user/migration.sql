-- Add user isolation to tracked champions.
ALTER TABLE "tracked_champions"
ADD COLUMN "userId" TEXT NOT NULL DEFAULT 'legacy';

DROP INDEX IF EXISTS "tracked_champions_championId_key";

CREATE UNIQUE INDEX "tracked_champions_userId_championId_key"
ON "tracked_champions"("userId", "championId");
