-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" DATE,  -- Added Date of Birth column

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);
