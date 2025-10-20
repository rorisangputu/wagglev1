/*
  Warnings:

  - You are about to drop the column `userId` on the `Waitlist` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."DogSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE');

-- CreateEnum
CREATE TYPE "public"."WalkerStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."WalkStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."WalkType" AS ENUM ('SHORT', 'MEDIUM', 'LONG', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'WALKER_ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."Waitlist" DROP CONSTRAINT "Waitlist_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Waitlist" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "public"."Walker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "idCopy" TEXT NOT NULL,
    "verificationToken" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "walkerId" TEXT NOT NULL,
    "walkerImage" TEXT,
    "rating" INTEGER,
    "totalWalks" INTEGER,
    "availability" TEXT,
    "status" "public"."WalkerStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Walker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Walk" (
    "id" TEXT NOT NULL,
    "walkNo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "walkerId" TEXT NOT NULL,
    "dogId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" "public"."WalkStatus" NOT NULL DEFAULT 'PENDING',
    "type" "public"."WalkType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "pickupAddress" TEXT NOT NULL,
    "notes" TEXT,
    "rating" INTEGER,
    "review" TEXT,
    "promo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Walk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "breed" TEXT NOT NULL,
    "size" "public"."DogSize" NOT NULL,
    "image" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Walker_email_key" ON "public"."Walker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Walker_walkerId_key" ON "public"."Walker"("walkerId");

-- CreateIndex
CREATE INDEX "Walker_email_idx" ON "public"."Walker"("email");

-- CreateIndex
CREATE INDEX "Walker_walkerId_idx" ON "public"."Walker"("walkerId");

-- CreateIndex
CREATE INDEX "Walker_status_idx" ON "public"."Walker"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Walk_walkNo_key" ON "public"."Walk"("walkNo");

-- CreateIndex
CREATE UNIQUE INDEX "Walk_bookingId_key" ON "public"."Walk"("bookingId");

-- CreateIndex
CREATE INDEX "Walk_userId_idx" ON "public"."Walk"("userId");

-- CreateIndex
CREATE INDEX "Walk_walkerId_idx" ON "public"."Walk"("walkerId");

-- CreateIndex
CREATE INDEX "Walk_status_idx" ON "public"."Walk"("status");

-- CreateIndex
CREATE INDEX "Walk_startTime_idx" ON "public"."Walk"("startTime");

-- AddForeignKey
ALTER TABLE "public"."Walk" ADD CONSTRAINT "Walk_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Walk" ADD CONSTRAINT "Walk_walkerId_fkey" FOREIGN KEY ("walkerId") REFERENCES "public"."Walker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Walk" ADD CONSTRAINT "Walk_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "public"."Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Walk" ADD CONSTRAINT "Walk_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dog" ADD CONSTRAINT "Dog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
