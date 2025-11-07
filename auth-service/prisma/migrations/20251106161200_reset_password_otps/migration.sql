-- CreateTable
CREATE TABLE "reset_otps" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reset_otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reset_otps_userId_key" ON "reset_otps"("userId");

-- CreateIndex
CREATE INDEX "reset_otps_userId_idx" ON "reset_otps"("userId");

-- AddForeignKey
ALTER TABLE "reset_otps" ADD CONSTRAINT "reset_otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
