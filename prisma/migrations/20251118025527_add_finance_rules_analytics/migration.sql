/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `MonthHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `day` on the `MonthHistory` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `categoryIcon` on the `Transaction` table. All the data in the column will be lost.
  - The `currency` column on the `UserSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `YearHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `month` on the `YearHistory` table. All the data in the column will be lost.
  - The required column `id` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `type` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'INVESTMENT');

-- CreateEnum
CREATE TYPE "public"."Currency" AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CNY', 'INR', 'RUB', 'BRL');

-- CreateEnum
CREATE TYPE "public"."AccountType" AS ENUM ('CHECKING', 'CREDIT_CARD', 'BROKERAGE', 'CASH', 'CRYPTO_WALLET');

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "createdAt",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "public"."TransactionType" NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."MonthHistory" DROP CONSTRAINT "MonthHistory_pkey",
DROP COLUMN "day",
ADD CONSTRAINT "MonthHistory_pkey" PRIMARY KEY ("month", "year", "userId");

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "category",
DROP COLUMN "categoryIcon",
ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'Completed',
ALTER COLUMN "updatedAt" DROP DEFAULT,
DROP COLUMN "type",
ADD COLUMN     "type" "public"."TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."UserSettings" ADD COLUMN     "experience" TEXT,
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "language" TEXT DEFAULT 'en',
DROP COLUMN "currency",
ADD COLUMN     "currency" "public"."Currency" NOT NULL DEFAULT 'USD';

-- AlterTable
ALTER TABLE "public"."YearHistory" DROP CONSTRAINT "YearHistory_pkey",
DROP COLUMN "month",
ADD CONSTRAINT "YearHistory_pkey" PRIMARY KEY ("year", "userId");

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."AccountType" NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" "public"."Currency" NOT NULL DEFAULT 'BRL',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RuleTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RuleTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DayHistory" (
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DayHistory_pkey" PRIMARY KEY ("day","month","year","userId")
);

-- CreateTable
CREATE TABLE "public"."MerchantRule" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "type" "public"."TransactionType" NOT NULL,

    CONSTRAINT "MerchantRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserRule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "type" "public"."TransactionType" NOT NULL,

    CONSTRAINT "UserRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_TransactionTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TransactionTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_UserRuleTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserRuleTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_MerchantRuleTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MerchantRuleTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "public"."Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RuleTag_name_key" ON "public"."RuleTag"("name");

-- CreateIndex
CREATE INDEX "DayHistory_userId_month_year_idx" ON "public"."DayHistory"("userId", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantRule_keyword_key" ON "public"."MerchantRule"("keyword");

-- CreateIndex
CREATE INDEX "UserRule_userId_idx" ON "public"."UserRule"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRule_userId_keyword_key" ON "public"."UserRule"("userId", "keyword");

-- CreateIndex
CREATE INDEX "_TransactionTags_B_index" ON "public"."_TransactionTags"("B");

-- CreateIndex
CREATE INDEX "_UserRuleTags_B_index" ON "public"."_UserRuleTags"("B");

-- CreateIndex
CREATE INDEX "_MerchantRuleTags_B_index" ON "public"."_MerchantRuleTags"("B");

-- CreateIndex
CREATE INDEX "Category_userId_idx" ON "public"."Category"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_userId_type_key" ON "public"."Category"("name", "userId", "type");

-- CreateIndex
CREATE INDEX "MonthHistory_userId_year_idx" ON "public"."MonthHistory"("userId", "year");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "public"."Transaction"("userId");

-- CreateIndex
CREATE INDEX "Transaction_date_idx" ON "public"."Transaction"("date");

-- CreateIndex
CREATE INDEX "Transaction_categoryId_idx" ON "public"."Transaction"("categoryId");

-- CreateIndex
CREATE INDEX "Transaction_accountId_idx" ON "public"."Transaction"("accountId");

-- AddForeignKey
ALTER TABLE "public"."UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MerchantRule" ADD CONSTRAINT "MerchantRule_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRule" ADD CONSTRAINT "UserRule_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TransactionTags" ADD CONSTRAINT "_TransactionTags_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."RuleTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TransactionTags" ADD CONSTRAINT "_TransactionTags_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserRuleTags" ADD CONSTRAINT "_UserRuleTags_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."RuleTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserRuleTags" ADD CONSTRAINT "_UserRuleTags_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."UserRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MerchantRuleTags" ADD CONSTRAINT "_MerchantRuleTags_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."MerchantRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MerchantRuleTags" ADD CONSTRAINT "_MerchantRuleTags_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."RuleTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
