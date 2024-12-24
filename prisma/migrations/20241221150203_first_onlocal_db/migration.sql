-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
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

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "imgKey" TEXT,
    "bio" TEXT,
    "showinfo" BOOLEAN,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signup" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Signup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "desc" TEXT NOT NULL,
    "img" TEXT,
    "attr" TEXT NOT NULL,
    "eleId" TEXT,
    "class" TEXT,
    "inner_html" TEXT,
    "cssText" TEXT,
    "imgKey" TEXT,
    "imgBgKey" TEXT,
    "user_id" TEXT NOT NULL,
    "update" TIMESTAMP(3),
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "show" BOOLEAN NOT NULL,
    "username" TEXT,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selector" (
    "id" SERIAL NOT NULL,
    "placement" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "eleId" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "inner_html" TEXT,
    "cssText" TEXT NOT NULL,
    "rows" JSONB NOT NULL,
    "rowNum" INTEGER NOT NULL,
    "colNum" INTEGER NOT NULL,
    "blog_id" INTEGER NOT NULL,
    "header" BOOLEAN NOT NULL,
    "footer" BOOLEAN NOT NULL,
    "headerType" TEXT,

    CONSTRAINT "Selector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColAttr" (
    "id" SERIAL NOT NULL,
    "T" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    "selector_id" INTEGER NOT NULL,

    CONSTRAINT "ColAttr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" SERIAL NOT NULL,
    "placement" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "eleId" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "inner_html" TEXT NOT NULL,
    "cssText" TEXT NOT NULL,
    "attr" TEXT,
    "img" TEXT,
    "imgKey" TEXT,
    "blog_id" INTEGER NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "placement" INTEGER,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "eleId" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "inner_html" TEXT NOT NULL,
    "cssText" TEXT NOT NULL,
    "blog_id" INTEGER NOT NULL,
    "template" TEXT NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Linecode" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "code_id" INTEGER NOT NULL,

    CONSTRAINT "Linecode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "chartOption" TEXT NOT NULL,
    "eleId" TEXT NOT NULL,
    "placement" INTEGER NOT NULL,
    "blog_id" INTEGER NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "rate" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "msg" TEXT NOT NULL,
    "user_id" TEXT,
    "blog_id" INTEGER,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "secret" BOOLEAN NOT NULL,
    "sent" BOOLEAN NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeletedImg" (
    "id" SERIAL NOT NULL,
    "count" INTEGER,
    "imgKey" TEXT NOT NULL,
    "del" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeletedImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "link" TEXT,
    "image" TEXT,
    "imageKey" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "likes" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageCount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" SERIAL NOT NULL,
    "blog_id" INTEGER,
    "post_id" INTEGER,

    CONSTRAINT "PageCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "basic" BOOLEAN NOT NULL,
    "isPage" BOOLEAN NOT NULL DEFAULT true,
    "desc" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "dollar" INTEGER NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevelopDeploy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "basic" BOOLEAN NOT NULL,
    "isPage" BOOLEAN NOT NULL,
    "desc" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "dollar" INTEGER NOT NULL,

    CONSTRAINT "DevelopDeploy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteImg" (
    "id" SERIAL NOT NULL,
    "imgKey" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "QuoteImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevDeployimg" (
    "id" SERIAL NOT NULL,
    "imgKey" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "DevDeployimg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Signup_id_key" ON "Signup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Signup_email_key" ON "Signup"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "DeletedImg_imgKey_key" ON "DeletedImg"("imgKey");

-- CreateIndex
CREATE UNIQUE INDEX "DeletedImg_imgKey_id_key" ON "DeletedImg"("imgKey", "id");

-- CreateIndex
CREATE UNIQUE INDEX "PageCount_name_key" ON "PageCount"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PageCount_name_id_key" ON "PageCount"("name", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_name_key" ON "Quote"("name");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteImg_imgKey_key" ON "QuoteImg"("imgKey");

-- CreateIndex
CREATE UNIQUE INDEX "DevDeployimg_imgKey_key" ON "DevDeployimg"("imgKey");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selector" ADD CONSTRAINT "Selector_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColAttr" ADD CONSTRAINT "ColAttr_selector_id_fkey" FOREIGN KEY ("selector_id") REFERENCES "Selector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Linecode" ADD CONSTRAINT "Linecode_code_id_fkey" FOREIGN KEY ("code_id") REFERENCES "Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCount" ADD CONSTRAINT "PageCount_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCount" ADD CONSTRAINT "PageCount_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteImg" ADD CONSTRAINT "QuoteImg_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevDeployimg" ADD CONSTRAINT "DevDeployimg_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
