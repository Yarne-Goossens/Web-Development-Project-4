-- AlterTable
ALTER TABLE "satellite" ADD COLUMN     "account_id" INTEGER;

-- AddForeignKey
ALTER TABLE "satellite" ADD CONSTRAINT "satellite_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;
