/*
  Warnings:

  - You are about to drop the `_booktograde` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_booktosubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_gradetosubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_booktograde` DROP FOREIGN KEY `_BookToGrade_A_fkey`;

-- DropForeignKey
ALTER TABLE `_booktograde` DROP FOREIGN KEY `_BookToGrade_B_fkey`;

-- DropForeignKey
ALTER TABLE `_booktosubject` DROP FOREIGN KEY `_BookToSubject_A_fkey`;

-- DropForeignKey
ALTER TABLE `_booktosubject` DROP FOREIGN KEY `_BookToSubject_B_fkey`;

-- DropForeignKey
ALTER TABLE `_gradetosubject` DROP FOREIGN KEY `_GradeToSubject_A_fkey`;

-- DropForeignKey
ALTER TABLE `_gradetosubject` DROP FOREIGN KEY `_GradeToSubject_B_fkey`;

-- DropTable
DROP TABLE `_booktograde`;

-- DropTable
DROP TABLE `_booktosubject`;

-- DropTable
DROP TABLE `_gradetosubject`;
