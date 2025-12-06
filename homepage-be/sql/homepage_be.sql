-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 05, 2025 lúc 04:06 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `homepage_be`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `book`
--

INSERT INTO `book` (`id`, `name`) VALUES
(2, 'i-Learn Smart Start'),
(1, 'Kết nối tri thức với cuộc sống');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `grade`
--

CREATE TABLE `grade` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `grade`
--

INSERT INTO `grade` (`id`, `name`) VALUES
(1, 'Lớp 1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lesson`
--

CREATE TABLE `lesson` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `gradeId` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `topicId` int(11) NOT NULL,
  `lectureUrl` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `lesson`
--

INSERT INTO `lesson` (`id`, `name`, `gradeId`, `subjectId`, `bookId`, `topicId`, `lectureUrl`) VALUES
(1, 'Bài 1: Các số 0, 1, 2, 3, 4, 5', 1, 1, 1, 1, 'https://data.bkt.net.vn/…'),
(2, 'Bài 2: Các số 6, 7, 8, 9, 10', 1, 1, 1, 1, NULL),
(3, 'Bài 3: Nhiều hơn, ít hơn, bằng nhau', 1, 1, 1, 1, 'Xem bài giảng'),
(4, 'Bài 4: So sánh số', 1, 1, 1, 1, NULL),
(5, 'Bài 5: Mấy và mấy', 1, 1, 1, 1, NULL),
(6, 'Bài 6: Luyện tập chung', 1, 1, 1, 1, NULL),
(7, 'Bài 7: Hình vuông, hình tròn, hình tam giác, hình chữ nhật', 1, 1, 1, 2, NULL),
(8, 'Bài 8: Thực hành lắp ghép, xếp hình', 1, 1, 1, 2, NULL),
(9, 'Bài 9: Luyện tập chung', 1, 1, 1, 2, NULL),
(10, 'Bài 10: Phép cộng trong phạm vi 10', 1, 1, 1, 3, NULL),
(11, 'Bài 11: Phép trừ trong phạm vi 10', 1, 1, 1, 3, NULL),
(12, 'Bài 12: Bảng cộng, bảng trừ trong phạm vi 10', 1, 1, 1, 3, NULL),
(13, 'Bài 13: Luyện tập chung', 1, 1, 1, 3, NULL),
(14, 'Bài 14: Khối lập phương, khối hộp chữ nhật', 1, 1, 1, 4, NULL),
(15, 'Bài 15: Vị trí, định hướng trong không gian', 1, 1, 1, 4, NULL),
(16, 'Bài 17: Ôn tập các số trong phạm vi 10', 1, 1, 1, 5, NULL),
(17, 'Bài 18: Ôn tập phép cộng, phép trừ trong phạm vi 10', 1, 1, 1, 5, NULL),
(18, 'Bài 19: Ôn tập hình học', 1, 1, 1, 5, NULL),
(19, 'Đề kiểm tra học kì 1 (Đề số 1)', 1, 1, 1, 6, NULL),
(20, 'Đề kiểm tra học kì 1 (Đề số 2)', 1, 1, 1, 6, NULL),
(21, 'Đề kiểm tra học kì 1 (Đề số 3)', 1, 1, 1, 6, NULL),
(22, 'Bài 21: Số có hai chữ số', 1, 1, 1, 7, NULL),
(23, 'Bài 22: So sánh số có hai chữ số', 1, 1, 1, 7, NULL),
(24, 'Bài 23: Bảng các số từ 1 tới 100', 1, 1, 1, 7, NULL),
(25, 'Bài 24: Luyện tập chung', 1, 1, 1, 7, NULL),
(26, 'Bài 25: Dài hơn, ngắn hơn', 1, 1, 1, 8, NULL),
(27, 'Bài 26: Đơn vị đo độ dài', 1, 1, 1, 8, NULL),
(28, 'Bài 27: Thực hành ước lượng và đo độ dài', 1, 1, 1, 8, NULL),
(29, 'Bài 28: Luyện tập chung', 1, 1, 1, 8, NULL),
(30, 'Bài 1: A a', 1, 2, 1, 9, NULL),
(31, 'Bài 2: B b dấu huyền', 1, 2, 1, 9, NULL),
(32, 'Bài 3: C c dấu sắc', 1, 2, 1, 9, NULL),
(33, 'Bài 4: E e Ê ê', 1, 2, 1, 9, NULL),
(34, 'Bài 5: Ôn tập và kể chuyện', 1, 2, 1, 9, NULL),
(35, 'Bài 6: O o dấu hỏi', 1, 2, 1, 9, NULL),
(36, 'Bài 7: Ô ô dấu nặng', 1, 2, 1, 9, NULL),
(37, 'Bài 8: D d Đ đ', 1, 2, 1, 9, NULL),
(38, 'Bài 9: Ơ ơ dấu ngã', 1, 2, 1, 9, NULL),
(39, 'Bài 10: Ôn tập và kể chuyện', 1, 2, 1, 9, NULL),
(40, 'Bài 11: I i K k', 1, 2, 1, 9, NULL),
(41, 'Bài 12: H h L l', 1, 2, 1, 9, NULL),
(42, 'Bài 13: U u Ư ư', 1, 2, 1, 9, NULL),
(43, 'Bài 14: Ch ch Kh kh', 1, 2, 1, 9, NULL),
(44, 'Bài 15: Ôn tập và kể chuyện', 1, 2, 1, 9, NULL),
(45, 'Bài 16: M m N n', 1, 2, 1, 9, NULL),
(46, 'Bài 17: G g Gi g', 1, 2, 1, 9, NULL),
(47, 'Bài 18: Gh gh Nh nh', 1, 2, 1, 9, NULL),
(48, 'Bài 19: Ng ng Ngh Ngh', 1, 2, 1, 9, NULL),
(49, 'Bài 20: Ôn tập và kể chuyện', 1, 2, 1, 9, NULL),
(50, 'Bài 21: R r S s', 1, 2, 1, 9, NULL),
(51, 'Bài 22: T t Tr tr', 1, 2, 1, 9, NULL),
(52, 'Bài 23: Th th ia', 1, 2, 1, 9, NULL),
(53, 'Bài 24: ua ưa', 1, 2, 1, 9, NULL),
(54, 'Bài 25: Ôn tập và kể chuyện', 1, 2, 1, 9, NULL),
(55, 'Bài 26: Ph ph Qu qu', 1, 2, 1, 9, NULL),
(56, 'Bài 27: V v X x', 1, 2, 1, 9, NULL),
(57, 'Bài 28: Y y', 1, 2, 1, 9, NULL),
(58, 'Bài 29: Luyện tập chính tả', 1, 2, 1, 9, NULL),
(59, 'Bài 30: Ôn tập và kể chuyện', 1, 2, 1, 9, NULL),
(60, 'Bài 31: an ăn ân', 1, 2, 1, 10, NULL),
(61, 'Bài 32: on ôn ơn', 1, 2, 1, 10, NULL),
(62, 'Bài 33: en ên in un', 1, 2, 1, 10, NULL),
(63, 'Bài 34: am ăm âm', 1, 2, 1, 10, NULL),
(64, 'Bài 35: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(65, 'Bài 36: om ôm ơm', 1, 2, 1, 10, NULL),
(66, 'Bài 37: em êm im um', 1, 2, 1, 10, NULL),
(67, 'Bài 38: ai ay ây', 1, 2, 1, 10, NULL),
(68, 'Bài 39: oi ôi ơi', 1, 2, 1, 10, NULL),
(69, 'Bài 40: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(70, 'Bài 41: ui ui', 1, 2, 1, 10, NULL),
(71, 'Bài 42: ao eo', 1, 2, 1, 10, NULL),
(72, 'Bài 43: au âu êu', 1, 2, 1, 10, NULL),
(73, 'Bài 44: iu ưu', 1, 2, 1, 10, NULL),
(74, 'Bài 45: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(75, 'Đề kiểm tra giữa học kì I - Đề số 1', 1, 2, 1, 11, NULL),
(76, 'Đề kiểm tra giữa học kì I - Đề số 2', 1, 2, 1, 11, NULL),
(77, 'Đề kiểm tra giữa học kì I - Đề số 3', 1, 2, 1, 11, NULL),
(78, 'Bài 46: ac ặc âc', 1, 2, 1, 10, NULL),
(79, 'Bài 47: oc ốc ục ức', 1, 2, 1, 10, NULL),
(80, 'Bài 48: at ăt ất', 1, 2, 1, 10, NULL),
(81, 'Bài 49: ot ôt ớt', 1, 2, 1, 10, NULL),
(82, 'Bài 50: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(83, 'Bài 51: et êt it', 1, 2, 1, 10, NULL),
(84, 'Bài 52: ut ut', 1, 2, 1, 10, NULL),
(85, 'Bài 53: ap ăp âp', 1, 2, 1, 10, NULL),
(86, 'Bài 54: op ôp op', 1, 2, 1, 10, NULL),
(87, 'Bài 55: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(88, 'Bài 56: ep êp ip up', 1, 2, 1, 10, NULL),
(89, 'Bài 57: anh ênh inh', 1, 2, 1, 10, NULL),
(90, 'Bài 58: ach ếch ich', 1, 2, 1, 10, NULL),
(91, 'Bài 59: ang ăng ông', 1, 2, 1, 10, NULL),
(92, 'Bài 60: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(93, 'Bài 61: ong ông ung ứng', 1, 2, 1, 10, NULL),
(94, 'Bài 62: iêc iên iêp', 1, 2, 1, 10, NULL),
(95, 'Bài 63: iêng iêm yên', 1, 2, 1, 10, NULL),
(96, 'Bài 64: iêt iêu yêu', 1, 2, 1, 10, NULL),
(97, 'Bài 65: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(98, 'Bài 66: uôi uôm', 1, 2, 1, 10, NULL),
(99, 'Bài 67: uốc uột', 1, 2, 1, 10, NULL),
(100, 'Bài 68: uôn uông', 1, 2, 1, 10, NULL),
(101, 'Bài 69: ươi ươu', 1, 2, 1, 10, NULL),
(102, 'Bài 70: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(103, 'Bài 71: ước ướt', 1, 2, 1, 10, NULL),
(104, 'Bài 72: ươm ướp', 1, 2, 1, 10, NULL),
(105, 'Bài 73: ươn ương', 1, 2, 1, 10, NULL),
(106, 'Bài 74: oa oе', 1, 2, 1, 10, NULL),
(107, 'Bài 75: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(108, 'Bài 76: oan oăn oat oặt', 1, 2, 1, 10, NULL),
(109, 'Bài 77: oai uê uy', 1, 2, 1, 10, NULL),
(110, 'Bài 78: uân uật', 1, 2, 1, 10, NULL),
(111, 'Bài 79: uyên uyêt', 1, 2, 1, 10, NULL),
(112, 'Bài 80: Ôn tập và kể chuyện', 1, 2, 1, 10, NULL),
(113, 'Bài 81: Bài ôn tập số 1', 1, 2, 1, 10, NULL),
(114, 'Bài 82: Bài ôn tập số 2', 1, 2, 1, 10, NULL),
(115, 'Đề kiểm tra cuối học kì 1 - Đề số 1', 1, 2, 1, 12, NULL),
(116, 'Đề kiểm tra cuối học kì 1 - Đề số 2', 1, 2, 1, 12, NULL),
(117, 'Đề kiểm tra cuối học kì 1 - Đề số 3', 1, 2, 1, 12, NULL),
(118, 'Bài 1: Tôi là học sinh lớp 1', 1, 2, 1, 13, NULL),
(119, 'Bài 2: Đôi tai xấu xí', 1, 2, 1, 13, NULL),
(120, 'Bài 3: Bạn của gió', 1, 2, 1, 13, NULL),
(121, 'Bài 4: Giải thưởng tình bạn', 1, 2, 1, 13, NULL),
(122, 'Bài 5: Sinh nhật của voi con', 1, 2, 1, 13, NULL),
(123, 'Bài 6: Ôn tập', 1, 2, 1, 13, NULL),
(124, 'Bài 1: Nụ hôn trên bàn tay', 1, 2, 1, 14, NULL),
(125, 'Bài 2: Làm anh', 1, 2, 1, 14, NULL),
(126, 'Bài 3: Cả nhà đi chơi núi', 1, 2, 1, 14, NULL),
(127, 'Bài 4: Quạt cho bà ngủ', 1, 2, 1, 14, NULL),
(128, 'Bài 5: Bữa cơm gia đình', 1, 2, 1, 14, NULL),
(129, 'Bài 6: Ngôi nhà', 1, 2, 1, 14, NULL),
(130, 'Bài 7: Ôn tập', 1, 2, 1, 14, NULL),
(131, 'Getting Started', 1, 3, 2, 15, NULL),
(132, 'Language (Family)', 1, 3, 2, 16, NULL),
(133, 'Phonics (a, b)', 1, 3, 2, 16, NULL),
(134, 'Language (School)', 1, 3, 2, 17, NULL),
(135, 'Phonics (c, d)', 1, 3, 2, 17, NULL),
(136, 'Review (Unit 1&2)', 1, 3, 2, 17, NULL),
(137, 'Language (Colors)', 1, 3, 2, 18, NULL),
(138, 'Phonics', 1, 3, 2, 18, NULL),
(139, 'Language (My body', 1, 3, 2, 19, NULL),
(140, 'Phonics (e, f)', 1, 3, 2, 19, NULL),
(141, 'Review (Unit 3&4)', 1, 3, 2, 19, NULL),
(142, 'Language 1 (Animals)', 1, 3, 2, 20, NULL),
(143, 'Phonics (g, h)', 1, 3, 2, 20, NULL),
(144, 'THE FIRST END-OF-TERM TEST 1', 1, 3, 2, 21, NULL),
(145, 'THE FIRST END-OF-TERM TEST 2', 1, 3, 2, 21, NULL),
(146, 'Language (Activities)', 1, 3, 2, 22, NULL),
(147, 'Phonics', 1, 3, 2, 22, NULL),
(148, 'Review (Unit 5&6)', 1, 3, 2, 22, NULL),
(149, 'Language (Number 1, 2, 3)', 1, 3, 2, 23, NULL),
(150, 'Phonics (i, j)', 1, 3, 2, 23, NULL),
(151, 'Language (Number 4, 5, 6)', 1, 3, 2, 23, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subject`
--

CREATE TABLE `subject` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `subject`
--

INSERT INTO `subject` (`id`, `name`) VALUES
(3, 'Tiếng Anh'),
(2, 'Tiếng Việt'),
(1, 'Toán');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `topic`
--

CREATE TABLE `topic` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `gradeId` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `topic`
--

INSERT INTO `topic` (`id`, `name`, `gradeId`, `subjectId`, `bookId`) VALUES
(9, 'Âm - chữ', 1, 2, 1),
(1, 'Chủ đề 1: Các số từ 0 đến 10', 1, 1, 1),
(2, 'Chủ đề 2: Làm quen với một số hình phẳng', 1, 1, 1),
(3, 'Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10', 1, 1, 1),
(4, 'Chủ đề 4: Làm quen với một số hình khối', 1, 1, 1),
(5, 'Chủ đề 5: Ôn tập học kì 1', 1, 1, 1),
(7, 'Chủ đề 6: Các số đến 100', 1, 1, 1),
(8, 'Chủ đề 7: Độ dài và đo độ dài', 1, 1, 1),
(12, 'Đề kiểm tra cuối học kì I', 1, 2, 1),
(11, 'Đề kiểm tra giữa học kì I', 1, 2, 1),
(15, 'GETTING STARTED', 1, 3, 2),
(14, 'Mái ấm gia đình', 1, 2, 1),
(6, 'Ôn tập và kiểm tra cuối học kì 1', 1, 1, 1),
(21, 'THE FIRST END-OF-TERM TEST', 1, 3, 2),
(13, 'Tôi và các bạn', 1, 2, 1),
(16, 'UNIT 1. FAMILY', 1, 3, 2),
(17, 'UNIT 2. SCHOOL', 1, 3, 2),
(18, 'UNIT 3. COLORS', 1, 3, 2),
(19, 'UNIT 4. MY BODY', 1, 3, 2),
(20, 'UNIT 5. ANIMALS', 1, 3, 2),
(22, 'UNIT 6. ACTIVITIES', 1, 3, 2),
(23, 'UNIT 7. NUMBERS', 1, 3, 2),
(10, 'Vần', 1, 2, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'teacher',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `password` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1e41a918-671a-4192-a75d-2b80181e5e58', '3fedec16e20a37f9798e8f274bad1c29b0c0638ba1f76305af9009f1eb0e1236', '2025-12-05 04:30:03.129', '20251205043002_init_catalog_schema', NULL, NULL, '2025-12-05 04:30:02.861', 1),
('429c6ac6-fabb-4fc8-90dc-4e9b7899088a', 'c53436bab8fa04187738d6ff9cc27eec6c7a9cde4e905d02409c20a26df00d97', '2025-12-05 06:56:48.670', '20251205065648_init_catalog_schema', NULL, NULL, '2025-12-05 06:56:48.142', 1),
('aafbee9f-ff90-4f52-8c56-a5048e6cbf8c', '7eca4bc7d1239645a966bca90a513cb04ea02fb4846e66cc6524d0e2e621950f', '2025-12-05 03:09:37.300', '20251205030937_init', NULL, NULL, '2025-12-05 03:09:37.286', 1),
('e90d577b-41d4-4d12-b223-f633c26d2705', '273eb2de41274a1c632bdc86414c9473afeb4a43418d275eff6c08d7077bbcea', '2025-12-05 06:58:43.559', '20251205065843_fix_relations', NULL, NULL, '2025-12-05 06:58:43.530', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Book_name_key` (`name`);

--
-- Chỉ mục cho bảng `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Grade_name_key` (`name`);

--
-- Chỉ mục cho bảng `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Lesson_name_topicId_key` (`name`,`topicId`),
  ADD KEY `Lesson_gradeId_fkey` (`gradeId`),
  ADD KEY `Lesson_subjectId_fkey` (`subjectId`),
  ADD KEY `Lesson_bookId_fkey` (`bookId`),
  ADD KEY `Lesson_topicId_fkey` (`topicId`);

--
-- Chỉ mục cho bảng `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Subject_name_key` (`name`);

--
-- Chỉ mục cho bảng `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Topic_name_gradeId_subjectId_bookId_key` (`name`,`gradeId`,`subjectId`,`bookId`),
  ADD KEY `Topic_gradeId_fkey` (`gradeId`),
  ADD KEY `Topic_subjectId_fkey` (`subjectId`),
  ADD KEY `Topic_bookId_fkey` (`bookId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Chỉ mục cho bảng `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `grade`
--
ALTER TABLE `grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT cho bảng `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `topic`
--
ALTER TABLE `topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `lesson`
--
ALTER TABLE `lesson`
  ADD CONSTRAINT `Lesson_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Lesson_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `grade` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Lesson_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Lesson_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `topic` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `topic`
--
ALTER TABLE `topic`
  ADD CONSTRAINT `Topic_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Topic_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `grade` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Topic_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
