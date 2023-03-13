-- DropForeignKey
ALTER TABLE "Planet" DROP CONSTRAINT "Planet_account_id_fkey";

-- AlterTable
ALTER TABLE "Planet" ALTER COLUMN "account_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;
