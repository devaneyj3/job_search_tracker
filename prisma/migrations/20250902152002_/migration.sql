-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'NO_NAME',
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "emailVerified" TIMESTAMP(6),
    "image" TEXT,
    "profileComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken")
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "id" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."Application" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobUrl" TEXT NOT NULL,
    "appliedDate" TIMESTAMP(3),
    "status" TEXT,
    "statusDate" TIMESTAMP(3),
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "salary" TEXT,
    "location" TEXT,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "nextFollowUpDate" TIMESTAMP(3),
    "lastContactedDate" TIMESTAMP(3),
    "jobDescription" TEXT,
    "interviewNotes" TEXT,
    "interviewDate" TIMESTAMP(3),
    "offerDetails" TEXT,
    "rejectionReason" TEXT,
    "dateArchived" TIMESTAMP(3),
    "notes" TEXT,
    "companyInfoId" INTEGER,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyInfo" (
    "id" SERIAL NOT NULL,
    "industry" TEXT,
    "size" TEXT,
    "website" TEXT,
    "linkedin" TEXT,

    CONSTRAINT "CompanyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_companyInfoId_key" ON "public"."Application"("companyInfoId");

-- CreateIndex
CREATE INDEX "Application_userId_idx" ON "public"."Application"("userId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "public"."Application"("status");

-- CreateIndex
CREATE INDEX "Application_appliedDate_idx" ON "public"."Application"("appliedDate");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "public"."Account"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "public"."Session"("userId");

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_companyInfoId_fkey" FOREIGN KEY ("companyInfoId") REFERENCES "public"."CompanyInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

--- Enable RLS on the Account table
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account" FORCE ROW LEVEL SECURITY;

---Create a bypass RLS policy (for admin purposes)
CREATE POLICY bypass_rls_policy ON "Account" USING (current_setting('app.bypass_rls', true)::text = 'on');


--- Enable RLS on the Application table
ALTER TABLE "Application" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Application" FORCE ROW LEVEL SECURITY;

---Create a bypass RLS policy (for admin purposes)
CREATE POLICY bypass_rls_policy ON "Application" USING (current_setting('app.bypass_rls', true)::text = 'on');

--- Enable RLS on the CompanyInfo table
ALTER TABLE "CompanyInfo" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CompanyInfo" FORCE ROW LEVEL SECURITY;

---Create a bypass RLS policy (for admin purposes)
CREATE POLICY bypass_rls_policy ON "CompanyInfo" USING (current_setting('app.bypass_rls', true)::text = 'on');


--- Enable RLS on the Session table
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" FORCE ROW LEVEL SECURITY;

---Create a bypass RLS policy (for admin purposes)
CREATE POLICY bypass_rls_policy ON "Session" USING (current_setting('app.bypass_rls', true)::text = 'on');


--- Enable RLS on the User table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

---Create a bypass RLS policy (for admin purposes)
CREATE POLICY bypass_rls_policy ON "User" USING (current_setting('app.bypass_rls', true)::text = 'on');


--- Enable RLS on the VerificationToken table
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationToken" FORCE ROW LEVEL SECURITY;


---Create a bypass RLS policy (for admin purposes)
CREATE POLICY bypass_rls_policy ON "VerificationToken" USING (current_setting('app.bypass_rls', true)::text = 'on');



