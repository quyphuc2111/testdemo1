/*
  Warnings:

  - You are about to drop the column `createdAt` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `grade` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `grade` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the column `practiceLessonId` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the column `practiceTopicId` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `topic` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `topic` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,topicId]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,gradeId,subjectId,bookId]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Made the column `gradeId` on table `lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subjectId` on table `lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookId` on table `lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topicId` on table `lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gradeId` on table `topic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subjectId` on table `topic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookId` on table `topic` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_gradeId_fkey`;

-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_topicId_fkey`;

-- DropForeignKey
ALTER TABLE `topic` DROP FOREIGN KEY `Topic_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `topic` DROP FOREIGN KEY `Topic_gradeId_fkey`;

-- DropForeignKey
ALTER TABLE `topic` DROP FOREIGN KEY `Topic_subjectId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `grade` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `lesson` DROP COLUMN `createdAt`,
    DROP COLUMN `practiceLessonId`,
    DROP COLUMN `practiceTopicId`,
    DROP COLUMN `updatedAt`,
    MODIFY `gradeId` INTEGER NOT NULL,
    MODIFY `subjectId` INTEGER NOT NULL,
    MODIFY `bookId` INTEGER NOT NULL,
    MODIFY `topicId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subject` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `topic` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `gradeId` INTEGER NOT NULL,
    MODIFY `subjectId` INTEGER NOT NULL,
    MODIFY `bookId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    DROP COLUMN `passwordHash`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'teacher';

-- CreateTable
CREATE TABLE `_GradeToSubject` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GradeToSubject_AB_unique`(`A`, `B`),
    INDEX `_GradeToSubject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BookToGrade` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BookToGrade_AB_unique`(`A`, `B`),
    INDEX `_BookToGrade_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BookToSubject` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BookToSubject_AB_unique`(`A`, `B`),
    INDEX `_BookToSubject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Book_name_key` ON `Book`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Lesson_name_topicId_key` ON `Lesson`(`name`, `topicId`);

-- CreateIndex
CREATE UNIQUE INDEX `Topic_name_gradeId_subjectId_bookId_key` ON `Topic`(`name`, `gradeId`, `subjectId`, `bookId`);

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `Grade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `Grade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GradeToSubject` ADD CONSTRAINT `_GradeToSubject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GradeToSubject` ADD CONSTRAINT `_GradeToSubject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToGrade` ADD CONSTRAINT `_BookToGrade_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToGrade` ADD CONSTRAINT `_BookToGrade_B_fkey` FOREIGN KEY (`B`) REFERENCES `Grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToSubject` ADD CONSTRAINT `_BookToSubject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToSubject` ADD CONSTRAINT `_BookToSubject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
