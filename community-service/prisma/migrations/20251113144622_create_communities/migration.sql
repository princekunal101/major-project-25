-- CreateEnum
CREATE TYPE "CommunityTypes" AS ENUM ('PRIVATE', 'PUBLIC', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "CommunityTopics" AS ENUM ('TOPIC', 'BRAND', 'CREATOR', 'MOVEMEMT', 'CAUSE', 'IDENTITY');

-- CreateEnum
CREATE TYPE "SharedValue" AS ENUM ('KNOWLEDGE_SHARING', 'ACTIVISM', 'ENTERTAINMENT', 'CREATIVITY', 'INNOVATION', 'SUPPORT');

-- CreateTable
CREATE TABLE "communities" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "communityName" TEXT NOT NULL,
    "description" TEXT,
    "guideline" TEXT,
    "communityType" "CommunityTypes" NOT NULL DEFAULT 'PUBLIC',
    "communityTopic" "CommunityTopics" NOT NULL DEFAULT 'IDENTITY',
    "keywords" TEXT[],
    "sharedValue" "SharedValue" NOT NULL DEFAULT 'KNOWLEDGE_SHARING',
    "createdBy" TEXT NOT NULL,
    "displayPicUrl" TEXT,
    "bannerPicUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommunityAdmins" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CommunityAdmins_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "communities_communityName_key" ON "communities"("communityName");

-- CreateIndex
CREATE INDEX "communities_createdBy_idx" ON "communities"("createdBy");

-- CreateIndex
CREATE INDEX "_CommunityAdmins_B_index" ON "_CommunityAdmins"("B");

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "community_users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityAdmins" ADD CONSTRAINT "_CommunityAdmins_A_fkey" FOREIGN KEY ("A") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityAdmins" ADD CONSTRAINT "_CommunityAdmins_B_fkey" FOREIGN KEY ("B") REFERENCES "community_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
