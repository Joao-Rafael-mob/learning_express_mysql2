/*
  Warnings:

  - You are about to alter the column `shape` on the `product_options` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to alter the column `type` on the `product_options` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `product_options` MODIFY `shape` ENUM('SQUARE', 'CIRCLE') NOT NULL DEFAULT 'SQUARE',
    MODIFY `type` ENUM('TEXT', 'COLOR') NOT NULL DEFAULT 'TEXT';
