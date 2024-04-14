/*
  Warnings:

  - Added the required column `count` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProducts" ADD COLUMN     "count" INTEGER NOT NULL;
