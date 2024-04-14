/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE order_number_seq;
ALTER TABLE "Order" ALTER COLUMN "number" SET DEFAULT nextval('order_number_seq');
ALTER SEQUENCE order_number_seq OWNED BY "Order"."number";

-- CreateIndex
CREATE UNIQUE INDEX "Order_number_key" ON "Order"("number");
