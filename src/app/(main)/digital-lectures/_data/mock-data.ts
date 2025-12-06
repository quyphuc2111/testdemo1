// Mock data for digital lectures system

export type Class = {
  id: number;
  name: string;
  level: string; // "Tiểu học" or "THCS"
  subject: string;
  teacher: string;
  studentCount: number;
  thumbnail: string;
};

export type Subject = {
  id: string;
  name: string;
  lessonCount: number;
  icon: string;
};

export type Category = {
  id: number;
  name: string;
  children?: Category[];
};

export type Lesson = {
  id: number;
  title: string;
  topic: string;
  book: string;
  duration: string;
  views: number;
  thumbnail: string;
  link_online?: string;
};

// Mock classes data - Lớp 1-9
const teachers = [
  "Nguyễn Văn A",
  "Trần Thị B",
  "Lê Văn C",
  "Phạm Thị D",
  "Hoàng Văn E",
  "Võ Thị F",
  "Đặng Văn G",
  "Bùi Thị H",
];

export const mockClasses: Class[] = [
  // Tiểu học - Lớp 1-5
  {
    id: 1,
    name: "Lớp 1",
    level: "Tiểu học",
    subject: "Toán",
    teacher: teachers[0],
    studentCount: 25,
    thumbnail: "/images/class/class_1.png",
  },
  {
    id: 2,
    name: "Lớp 2",
    level: "Tiểu học",
    subject: "Toán",
    teacher: teachers[1],
    studentCount: 28,
    thumbnail: "/images/class/class_2.png",
  },
  {
    id: 3,
    name: "Lớp 3",
    level: "Tiểu học",
    subject: "Toán",
    teacher: teachers[2],
    studentCount: 26,
    thumbnail: "/images/class/class_3.png",
  },
  {
    id: 4,
    name: "Lớp 4",
    level: "Tiểu học",
    subject: "Toán",
    teacher: teachers[3],
    studentCount: 27,
    thumbnail: "/images/class/class_4.png",
  },
  {
    id: 5,
    name: "Lớp 5",
    level: "Tiểu học",
    subject: "Toán",
    teacher: teachers[4],
    studentCount: 29,
    thumbnail: "/images/class/class_5.png",
  },
  // THCS - Lớp 6-9
  {
    id: 6,
    name: "Lớp 6",
    level: "THCS",
    subject: "Toán",
    teacher: teachers[5],
    studentCount: 30,
    thumbnail: "/images/class/class_6.png",
  },
  {
    id: 7,
    name: "Lớp 7",
    level: "THCS",
    subject: "Toán",
    teacher: teachers[6],
    studentCount: 32,
    thumbnail: "/images/class/class_7.png",
  },
  {
    id: 8,
    name: "Lớp 8",
    level: "THCS",
    subject: "Toán",
    teacher: teachers[7],
    studentCount: 31,
    thumbnail: "/images/class/class_8.png",
  },
  {
    id: 9,
    name: "Lớp 9",
    level: "THCS",
    subject: "Toán",
    teacher: teachers[0],
    studentCount: 30,
    thumbnail: "/images/class/class_9.png",
  },
];

// Get subjects by class level
export const getSubjectsByClass = (classId: string): Subject[] => {
  const classNum = parseInt(classId);

  // Tiểu học (Lớp 1-5)
  if (classNum >= 1 && classNum <= 5) {
    const baseSubjects: Subject[] = [
      {
        id: "toan",
        name: "Toán",
        lessonCount: 24,
        icon: "/images/subjects/toan.png",
      },
      {
        id: "tiengviet",
        name: "Tiếng Việt",
        lessonCount: 18,
        icon: "/images/subjects/tieng_viet.png",
      },
      {
        id: "anh",
        name: "Tiếng Anh",
        lessonCount: 19,
        icon: "/images/subjects/tieng_anh.png",
      },
    ];

    // Lớp 3-5 có thêm Tin học
    if (classNum >= 3) {
      baseSubjects.push({
        id: "tin",
        name: "Tin học",
        lessonCount: 16,
        icon: "/images/subjects/tin_hoc.png",
      });
    }

    // Lớp 4-5 có thêm các môn
    if (classNum >= 4) {
      baseSubjects.push(
        {
          id: "khoahoc",
          name: "Khoa Học",
          lessonCount: 20,
          icon: "/images/subjects/khoa_hoc.png",
        },
        {
          id: "lichsudiali",
          name: "Lịch sử và Địa lí",
          lessonCount: 15,
          icon: "/images/subjects/lich_su_va_dia_li.png",
        },
        {
          id: "daoduc",
          name: "Đạo đức",
          lessonCount: 12,
          icon: "/images/subjects/dao_duc.png",
        }
      );
    }

    return baseSubjects;
  }

  // THCS (Lớp 6-9)
  if (classNum >= 6 && classNum <= 9) {
    const baseSubjects: Subject[] = [
      {
        id: "toan",
        name: "Toán",
        lessonCount: 24,
        icon: "/images/subjects/toan.png",
      },
      {
        id: "van",
        name: "Ngữ văn",
        lessonCount: 18,
        icon: "/images/subjects/ngu_van.png",
      },
      {
        id: "anh",
        name: "Tiếng Anh",
        lessonCount: 19,
        icon: "/images/subjects/tieng_anh.png",
      },
      {
        id: "khoahoctunhien",
        name: "Khoa học tự nhiên",
        lessonCount: 22,
        icon: "/images/subjects/khoa_hoc_tu_nhien.png",
      },
      {
        id: "lichsudiali",
        name: "Lịch sử và Địa lí",
        lessonCount: 15,
        icon: "/images/subjects/lich_su_va_dia_li.png",
      },
      {
        id: "tin",
        name: "Tin học",
        lessonCount: 16,
        icon: "/images/subjects/tin_hoc.png",
      },
      {
        id: "gdcd",
        name: "Giáo dục công dân",
        lessonCount: 12,
        icon: "/images/subjects/giao_duc_cong_dan.png",
      },
      {
        id: "congnghe",
        name: "Công nghệ",
        lessonCount: 14,
        icon: "/images/subjects/cong_nghe.png",
      },
    ];

    // Lớp 6-7 có thêm Hoạt động trải nghiệm hướng nghiệp
    if (classNum <= 7) {
      baseSubjects.push({
        id: "hoatdongtrainghiem",
        name: "Hoạt động trải nghiệm hướng nghiệp",
        lessonCount: 10,
        icon: "/images/subjects/hoat_dong_trai_nghiem.png",
      });
    }

    return baseSubjects;
  }

  // Default: return all subjects
  return [
    {
      id: "toan",
      name: "Toán",
      lessonCount: 24,
      icon: "/images/subjects/toan.png",
    },
    {
      id: "van",
      name: "Ngữ văn",
      lessonCount: 18,
      icon: "/images/subjects/ngu_van.png",
    },
    {
      id: "anh",
      name: "Tiếng Anh",
      lessonCount: 19,
      icon: "/images/subjects/tieng_anh.png",
    },
  ];
};

// Mock subjects data (for backward compatibility)
export const mockSubjects: Subject[] = [
  {
    id: "toan",
    name: "Toán",
    lessonCount: 24,
    icon: "/images/subjects/toan.png",
  },
  {
    id: "van",
    name: "Ngữ văn",
    lessonCount: 18,
    icon: "/images/subjects/ngu_van.png",
  },
  {
    id: "anh",
    name: "Tiếng Anh",
    lessonCount: 19,
    icon: "/images/subjects/tieng_anh.png",
  },
  {
    id: "tin",
    name: "Tin học",
    lessonCount: 16,
    icon: "/images/subjects/tin_hoc.png",
  },
  {
    id: "gdcd",
    name: "Giáo dục công dân",
    lessonCount: 12,
    icon: "/images/subjects/giao_duc_cong_dan.png",
  },
  {
    id: "congnghe",
    name: "Công nghệ",
    lessonCount: 14,
    icon: "/images/subjects/cong_nghe.png",
  },
];

// Subject name mapping
export const subjectNames: { [key: string]: string } = {
  toan: "Toán",
  tiengviet: "Tiếng Việt",
  van: "Ngữ văn",
  anh: "Tiếng Anh",
  tin: "Tin học",
  khoahoc: "Khoa Học",
  khoahoctunhien: "Khoa học tự nhiên",
  lichsudiali: "Lịch sử và Địa lí",
  daoduc: "Đạo đức",
  gdcd: "Giáo dục công dân",
  congnghe: "Công nghệ",
  hoatdongtrainghiem: "Hoạt động trải nghiệm hướng nghiệp",
};

// Get categories by subject (Book → Topic)
export const getCategoriesBySubject = (subjectId: string): Category[] => {
  // Most subjects use "Kết nối tri thức với cuộc sống"
  if (subjectId === "anh") {
    // Tiếng Anh uses "i-Learn Smart Start"
    return [
      {
        id: 1,
        name: "i-Learn Smart Start",
        children: [
          {
            id: 11,
            name: "Unit 1: Hello",
          },
          {
            id: 12,
            name: "Unit 2: My Family",
          },
          {
            id: 13,
            name: "Unit 3: My School",
          },
          {
            id: 14,
            name: "Unit 4: My Friends",
          },
        ],
      },
    ];
  }

  // Default: Kết nối tri thức với cuộc sống
  return [
    {
      id: 1,
      name: "Kết nối tri thức với cuộc sống",
      children: [
        {
          id: 11,
          name: "Chủ đề 1: Những kiến thức cơ bản",
        },
        {
          id: 12,
          name: "Chủ đề 2: Phát triển kỹ năng",
        },
        {
          id: 13,
          name: "Chủ đề 3: Ứng dụng thực tế",
        },
        {
          id: 14,
          name: "Chủ đề 4: Mở rộng và nâng cao",
        },
      ],
    },
  ];
};

// Mock categories data (for backward compatibility)
export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Kết nối tri thức với cuộc sống",
    children: [
      {
        id: 11,
        name: "Chủ đề 1: Những kiến thức cơ bản",
      },
      {
        id: 12,
        name: "Chủ đề 2: Phát triển kỹ năng",
      },
      {
        id: 13,
        name: "Chủ đề 3: Ứng dụng thực tế",
      },
    ],
  },
];

// Mock lessons data
export const mockLessons: Lesson[] = [
  {
    id: 111,
    title: "Bài 1: Các số 0, 1, 2, 3, 4, 5",
    topic: "Chủ đề 1: Các số từ 0 đến 10",
    book: "Kết nối tri thức với cuộc sống",
    duration: "45 phút",
    views: 1250,
    thumbnail: "/images/lectures/image_lecture.png",
    link_online:
      "https://docs.google.com/presentation/d/e/2PACX-1vT-T-T-T-T/embed?start=false&loop=false&delayms=3000",
  },
  {
    id: 112,
    title: "Bài 2: Các số 6, 7, 8, 9, 10",
    topic: "Chủ đề 1: Các số từ 0 đến 10",
    book: "Kết nối tri thức với cuộc sống",
    duration: "45 phút",
    views: 1180,
    thumbnail: "/images/lectures/image_lecture.png",
    link_online:
      "https://docs.google.com/presentation/d/e/2PACX-1vT-T-T-T-T/embed?start=false&loop=false&delayms=3000",
  },
  {
    id: 113,
    title: "Bài 3: Nhiều hơn, ít hơn, bằng nhau",
    topic: "Chủ đề 1: Các số từ 0 đến 10",
    book: "Kết nối tri thức với cuộc sống",
    duration: "40 phút",
    views: 1100,
    thumbnail: "/images/lectures/image_lecture.png",
    link_online:
      "https://docs.google.com/presentation/d/e/2PACX-1vT-T-T-T-T/embed?start=false&loop=false&delayms=3000",
  },
  {
    id: 114,
    title: "Bài 4: So sánh số",
    topic: "Chủ đề 1: Các số từ 0 đến 10",
    book: "Kết nối tri thức với cuộc sống",
    duration: "50 phút",
    views: 1050,
    thumbnail: "/images/lectures/image_lecture.png",
  },
  {
    id: 121,
    title: "Bài 7: Hình vuông, hình tròn, hình tam giác",
    topic: "Chủ đề 2: Làm quen với một số hình phẳng",
    book: "Kết nối tri thức với cuộc sống",
    duration: "45 phút",
    views: 980,
    thumbnail: "/images/lectures/image_lecture.png",
  },
  {
    id: 122,
    title: "Bài 8: Thực hành lắp ghép, xếp hình",
    topic: "Chủ đề 2: Làm quen với một số hình phẳng",
    book: "Kết nối tri thức với cuộc sống",
    duration: "50 phút",
    views: 920,
    thumbnail: "/images/lectures/image_lecture.png",
  },
  {
    id: 131,
    title: "Bài 10: Phép cộng trong phạm vi 10",
    topic: "Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10",
    book: "Kết nối tri thức với cuộc sống",
    duration: "45 phút",
    views: 1150,
    thumbnail: "/images/lectures/image_lecture.png",
  },
  {
    id: 132,
    title: "Bài 11: Phép trừ trong phạm vi 10",
    topic: "Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10",
    book: "Kết nối tri thức với cuộc sống",
    duration: "45 phút",
    views: 1080,
    thumbnail: "/images/lectures/image_lecture.png",
  },
  {
    id: 133,
    title: "Bài 12: Bảng cộng, bảng trừ",
    topic: "Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10",
    book: "Kết nối tri thức với cuộc sống",
    duration: "50 phút",
    views: 1020,
    thumbnail: "/images/lectures/image_lecture.png",
  },
  {
    id: 211,
    title: "Bài 14: Khối lập phương, khối hộp chữ nhật",
    topic: "Chủ đề 4: Làm quen với một số hình khối",
    book: "Chân trời sáng tạo",
    duration: "45 phút",
    views: 950,
    thumbnail: "/images/lectures/image_lecture.png",
  },
  {
    id: 212,
    title: "Bài 15: Vị trí, định hướng trong không gian",
    topic: "Chủ đề 4: Làm quen với một số hình khối",
    book: "Chân trời sáng tạo",
    duration: "40 phút",
    views: 890,
    thumbnail: "/images/lectures/image_lecture.png",
  },
  {
    id: 221,
    title: "Bài 17: Ôn tập các số trong phạm vi 10",
    topic: "Chủ đề 5: Ôn tập học kì 1",
    book: "Chân trời sáng tạo",
    duration: "50 phút",
    views: 1100,
    thumbnail: "/images/lectures/image_lecture.png",
  },
  {
    id: 222,
    title: "Bài 18: Ôn tập phép cộng, phép trừ",
    topic: "Chủ đề 5: Ôn tập học kì 1",
    book: "Chân trời sáng tạo",
    duration: "50 phút",
    views: 1050,
    thumbnail: "/images/lectures/image_lecture.png",
  },
];
