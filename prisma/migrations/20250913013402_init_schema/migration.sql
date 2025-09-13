-- CreateTable
CREATE TABLE "public"."UserSettings" (
    "userId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'income'
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'income',
    "category" TEXT NOT NULL,
    "categoryIcon" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MonthHistory" (
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MonthHistory_pkey" PRIMARY KEY ("day","month","year","userId")
);

-- CreateTable
CREATE TABLE "public"."YearHistory" (
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "YearHistory_pkey" PRIMARY KEY ("month","year","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_userId_type_key" ON "public"."Category"("name", "userId", "type");
