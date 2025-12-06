/**
 * Types cho Digital Lecture API
 * Dựa trên các endpoint trong /api/digital-lecture
 */

/**
 * Subject trong danh sách lớp
 */
export interface LectureClassSubject {
    subjectId: string;
    subjectName: string;
}

/**
 * Lớp học (Class/Grade) với thông tin tổng hợp
 * GET /api/digital-lecture/classes
 */
export interface LectureClass {
    id: number;
    name: string;
    image: string | null;
    schoolLevel: string;
    subject: LectureClassSubject[];
    topicCount: number;
    bookCount: number;
}

/**
 * Môn học (Subject)
 * GET /api/digital-lecture/classes/[classId]/subjects
 */
export interface LectureSubject {
    id: string;
    name: string;
    bookCount: number;
    topicCount: number;
}

/**
 * Topic trong danh mục
 */
export interface CategoryTopic {
    id: number;
    name: string;
}

/**
 * Danh mục (Book + Topics)
 * GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/categories
 */
export interface LectureCategory {
    id: number;
    book: string;
    children: CategoryTopic[];
}

/**
 * Bài giảng (Lesson) trong danh sách
 * GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/lessons
 */
export interface LectureLesson {
    id: number;
    title: string;
    topicId: number;
    topic: string;
    bookId: number;
    book: string;
    classId: number;
    className: string;
    subjectId: number;
    subjectName: string;
}

/**
 * Chi tiết bài giảng
 * GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/lessons/[lessonId]
 */
export interface LectureLessonDetail {
    id: number;
    title: string;
    topicId: number;
    topic: string;
    bookId: number;
    book: string;
    lectureOnlineLink: string | null;
    classId: number;
    className: string;
    subjectId: number;
    subjectName: string;
}

/**
 * Query parameters cho GET lessons
 */
export interface GetLessonsParams {
    topicId?: number;
    page?: number;
    limit?: number;
}

/**
 * API Response Types (sử dụng với ApiSuccessResponse từ apiResponse.ts)
 * Lưu ý: axiosInstance.get() trả về ApiSuccessResponse<T>, nên response.data sẽ là T
 * Với lessons endpoint, pagination nằm ở response.pagination (ngoài data)
 */
export type GetClassesResponse = LectureClass[];
export type GetSubjectsResponse = LectureSubject[];
export type GetCategoriesResponse = LectureCategory[];
export type GetLessonsResponse = LectureLesson[];
export type GetLessonDetailResponse = LectureLessonDetail;
