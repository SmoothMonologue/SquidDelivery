/*
  Warnings:

  - A unique constraint covering the columns `[businessNumber]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,restaurantId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessNumber` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_partnerId_fkey`;

-- DropIndex
DROP INDEX `Comment_partnerId_key` ON `Comment`;

-- AlterTable
ALTER TABLE `Partner` ADD COLUMN `businessNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `cash` INTEGER NOT NULL DEFAULT 10000,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Restaurant` ADD COLUMN `starRating` INTEGER NULL;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `restaurantId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Partner_businessNumber_key` ON `Partner`(`businessNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Review_userId_restaurantId_key` ON `Review`(`userId`, `restaurantId`);

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
