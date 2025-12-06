export interface RawLearningRow {
  class: string;
  subject: string | null;
  book: string | null;
  topic_name: string | null;
  lesson_name: string;
  topic_id: string | null; // URL
  lesson_id: string | null; // URL
}

export interface Lesson {
  id: string;
  name: string;
  url: string | null;
  type: "lesson" | "exam"; // inferred from name or explicit? User said "tag (bài/đề)"
  status: "todo" | "in-progress" | "done";
}

export interface Topic {
  id: string;
  name: string;
  url: string | null;
  lessons: Lesson[];
  class: string;
  subject: string;
  book: string;
  status: "todo" | "in-progress" | "done";
}

export const MOCK_DB_DATA: RawLearningRow[] = [
  // --- TOÁN ---
  {
    class: "Lớp 1",
    subject: "Toán",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Chủ đề 1: Các số từ 0 đến 10",
    lesson_name: "Bài 1: Các số 0, 1, 2, 3, 4, 5",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=839",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: null,
    book: null,
    topic_name: null,
    lesson_name: "Bài 2: Các số 6, 7, 8, 9, 10",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=839",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: null,
    book: null,
    topic_name: null,
    lesson_name: "Luyện tập chung",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=839",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Toán",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Chủ đề 2: Làm quen với một số hình phẳng",
    lesson_name: "Hình vuông, hình tròn, hình tam giác",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=920",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: null,
    book: null,
    topic_name: null,
    lesson_name: "Hình chữ nhật",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=920",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Toán",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10",
    lesson_name: "Phép cộng trong phạm vi 10",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=921",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: null,
    book: null,
    topic_name: null,
    lesson_name: "Phép trừ trong phạm vi 10",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=921",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Toán",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Chủ đề 4: Làm quen với một số hình khối",
    lesson_name: "Khối lập phương, khối hộp chữ nhật",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1057",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Toán",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Chủ đề 5: Ôn tập học kì 1",
    lesson_name: "Ôn tập các số đến 10",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1058",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Toán",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Ôn tập và kiểm tra cuối học kì 1",
    lesson_name: "Đề kiểm tra học kì 1",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1059",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Toán",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Chủ đề 6: Các số đến 100",
    lesson_name: "Chục và đơn vị",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1060",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Toán",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Chủ đề 7: Độ dài và đo độ dài",
    lesson_name: "Xăng-ti-mét",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1061",
    lesson_id: null,
  },

  // --- TIẾNG VIỆT ---
  {
    class: "Lớp 1",
    subject: "Tiếng Việt",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Âm - chữ",
    lesson_name: "Bài 1: A a",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=848",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: null,
    book: null,
    topic_name: null,
    lesson_name: "Bài 2: B b",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=848",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Việt",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Vần",
    lesson_name: "Bài 1: an, at",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1062",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Việt",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Đề kiểm tra giữa học kì I",
    lesson_name: "Đề 1",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1064",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Việt",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Đề kiểm tra cuối học kì I",
    lesson_name: "Đề 1",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1071",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Việt",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Tôi và các bạn",
    lesson_name: "Bài đọc: Tôi đi học",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1072",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Việt",
    book: "Kết nối tri thức với cuộc sống",
    topic_name: "Mái ấm gia đình",
    lesson_name: "Bài đọc: Ngôi nhà",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1073",
    lesson_id: null,
  },

  // --- TIẾNG ANH ---
  {
    class: "Lớp 1",
    subject: "Tiếng Anh",
    book: "i-Learn Smart Start",
    topic_name: "GETTING STARTED",
    lesson_name: "Hello",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=853",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: null,
    book: null,
    topic_name: null,
    lesson_name: "Numbers",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=853",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Anh",
    book: "i-Learn Smart Start",
    topic_name: "UNIT 1. FAMILY",
    lesson_name: "Lesson 1: Family members",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=844",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Anh",
    book: "i-Learn Smart Start",
    topic_name: "UNIT 2. SCHOOL",
    lesson_name: "Lesson 1: School things",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=922",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Anh",
    book: "i-Learn Smart Start",
    topic_name: "UNIT 3. COLORS",
    lesson_name: "Lesson 1: Red, Blue, Yellow",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=923",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Anh",
    book: "i-Learn Smart Start",
    topic_name: "UNIT 4. MY BODY",
    lesson_name: "Lesson 1: Head, Shoulders",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=924",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Anh",
    book: "i-Learn Smart Start",
    topic_name: "UNIT 5. ANIMALS",
    lesson_name: "Lesson 1: Cat, Dog",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=925",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Anh",
    book: "i-Learn Smart Start",
    topic_name: "THE FIRST END-OF-TERM TEST",
    lesson_name: "Test 1",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1074",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Anh",
    book: "i-Learn Smart Start",
    topic_name: "UNIT 6. ACTIVITIES",
    lesson_name: "Lesson 1: Running, Swimming",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1075",
    lesson_id: null,
  },
  {
    class: "Lớp 1",
    subject: "Tiếng Anh",
    book: "i-Learn Smart Start",
    topic_name: "UNIT 7. NUMBERS",
    lesson_name: "Lesson 1: 11-20",
    topic_id: "https://lms.bkt.net.vn/course/view.php?id=1076",
    lesson_id: null,
  },
];

export function parseLearningData(rows: RawLearningRow[]): Topic[] {
  const topics: Topic[] = [];
  let currentClass = "";
  let currentSubject = "";
  let currentBook = "";
  let currentTopic: Topic | null = null;

  rows.forEach((row, index) => {
    // Propagate values
    if (row.class) currentClass = row.class;
    if (row.subject) currentSubject = row.subject;
    if (row.book) currentBook = row.book;

    // Determine if new topic
    if (row.topic_name) {
      // New topic start
      currentTopic = {
        id: `topic-${index}`,
        name: row.topic_name,
        url: row.topic_id,
        lessons: [],
        class: currentClass,
        subject: currentSubject,
        book: currentBook,
        status: "todo",
      };
      topics.push(currentTopic);
    } else if (!currentTopic) {
      // No topic yet, create "Uncategorized"
      currentTopic = {
        id: `topic-uncat-${index}`,
        name: "Chưa phân loại",
        url: null,
        lessons: [],
        class: currentClass,
        subject: currentSubject,
        book: currentBook,
        status: "todo",
      };
      topics.push(currentTopic);
    }

    // Add lesson
    if (row.lesson_name && currentTopic) {
      const isExam =
        row.lesson_name.toLowerCase().includes("đề") ||
        row.lesson_name.toLowerCase().includes("thi");
      currentTopic.lessons.push({
        id: `lesson-${index}`,
        name: row.lesson_name,
        url: row.lesson_id,
        type: isExam ? "exam" : "lesson",
        status: "todo",
      });
    }
  });

  return topics;
}

// --- Helper Functions for Redesign ---

export interface ClassInfo {
  id: string;
  name: string;
  level: "primary" | "secondary" | "high"; // Tiểu học, THCS, THPT
  subjects: string[];
  totalBooks: number;
  totalTopics: number;
}

export interface SubjectInfo {
  id: string;
  name: string;
  image?: string; // Placeholder for now
}

export const getLevelFromClass = (
  className: string
): "primary" | "secondary" | "high" => {
  const num = parseInt(className.replace(/\D/g, ""));
  if (num >= 1 && num <= 5) return "primary";
  if (num >= 6 && num <= 9) return "secondary";
  return "high";
};

export const getUniqueClasses = (data: RawLearningRow[]): ClassInfo[] => {
  const classesMap = new Map<string, Set<string>>(); // Class -> Subjects
  const classStats = new Map<
    string,
    { books: Set<string>; topics: Set<string> }
  >();

  data.forEach((row) => {
    if (!row.class) return;

    // Subjects
    if (!classesMap.has(row.class)) {
      classesMap.set(row.class, new Set());
      classStats.set(row.class, { books: new Set(), topics: new Set() });
    }
    if (row.subject) {
      classesMap.get(row.class)?.add(row.subject);
    }

    // Stats
    const stats = classStats.get(row.class);
    if (stats) {
      if (row.book) stats.books.add(row.book);
      if (row.topic_name) stats.topics.add(row.topic_name);
    }
  });

  return Array.from(classesMap.entries())
    .map(([className, subjects]) => {
      const stats = classStats.get(className);
      return {
        id: className, // Simple ID
        name: className,
        level: getLevelFromClass(className),
        subjects: Array.from(subjects).sort(),
        totalBooks: stats?.books.size || 0,
        totalTopics: stats?.topics.size || 0,
      };
    })
    .sort((a, b) => {
      const numA = parseInt(a.name.replace(/\D/g, ""));
      const numB = parseInt(b.name.replace(/\D/g, ""));
      return numA - numB;
    });
};

export const getSubjectsForClass = (
  data: RawLearningRow[],
  className: string
): SubjectInfo[] => {
  const subjects = new Set<string>();
  data.forEach((row) => {
    if (row.class === className && row.subject) {
      subjects.add(row.subject);
    }
  });
  return Array.from(subjects)
    .sort()
    .map((s) => ({
      id: s,
      name: s,
    }));
};

// --- Added functions to fix page.tsx errors ---

export interface CategoryNode {
  id: string | number;
  name: string;
  children?: CategoryNode[];
}

export interface GridLesson {
  id: string | number;
  title: string;
  topic: string;
  book: string;
  duration: string;
  views: number;
  thumbnail: string;
  link_online?: string;
  type?: string;
}

export const getCategoriesBySubject = (
  subjectId: string,
  classId: string
): CategoryNode[] => {
  const topics = parseLearningData(MOCK_DB_DATA);
  const filteredTopics = topics.filter(
    (t) => t.class === classId && t.subject === subjectId
  );

  // Group by Book
  const booksMap = new Map<string, CategoryNode[]>();
  filteredTopics.forEach((topic) => {
    const bookName = topic.book || "Chưa phân loại";
    if (!booksMap.has(bookName)) {
      booksMap.set(bookName, []);
    }
    booksMap.get(bookName)?.push({
      id: topic.id,
      name: topic.name,
      children: [],
    });
  });

  return Array.from(booksMap.entries()).map(
    ([bookName, topicsList], index) => ({
      id: `book-${index}`,
      name: bookName,
      children: topicsList,
    })
  );
};

export const getLessons = (
  classId: string,
  subjectId: string
): GridLesson[] => {
  const topics = parseLearningData(MOCK_DB_DATA);
  const filteredTopics = topics.filter(
    (t) => t.class === classId && t.subject === subjectId
  );

  const lessons: GridLesson[] = [];
  filteredTopics.forEach((topic) => {
    topic.lessons.forEach((l) => {
      lessons.push({
        id: l.id,
        title: l.name,
        topic: topic.name,
        book: topic.book || "Chưa phân loại",
        duration: "15:00", // Mock
        views: 120, // Mock
        thumbnail: "/images/lectures/image_lecture.png",
        link_online: l.url || undefined,
        type: l.type,
      });
    });
  });
  return lessons;
};

export const getSubjectsByClass = (className: string) =>
  getSubjectsForClass(MOCK_DB_DATA, className);

export const mockClasses = getUniqueClasses(MOCK_DB_DATA).map((c) => {
  const classNum = parseInt(c.name.replace(/\D/g, "")) || 1;
  return {
    ...c,
    level:
      c.level === "primary"
        ? "Tiểu học"
        : c.level === "secondary"
        ? "THCS"
        : "THPT",
    thumbnail: `/images/class/class_${classNum}.png`,
  };
});
