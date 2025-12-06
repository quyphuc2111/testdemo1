import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
    GetClassesResponse,
    GetSubjectsResponse,
    GetCategoriesResponse,
    GetLessonsResponse,
    GetLessonsParams,
    GetLessonDetailResponse,
} from "@/types/digital-lecture.type";
import type { PaginationMeta } from "@/lib/apiResponse";

/**
 * Hook để lấy danh sách lớp học
 * GET /api/digital-lecture/classes
 */
export const useGetLectureClasses = () => {
    return useQuery({
        queryKey: ["digital-lecture", "classes"],
        queryFn: async () => {
            const response = await axiosInstance.get<GetClassesResponse>(
                "/digital-lecture/classes"
            );
            return response.data;
        },
    });
};

/**
 * Hook để lấy danh sách môn học theo lớp
 * GET /api/digital-lecture/classes/[classId]/subjects
 */
export const useGetLectureSubjects = (classId: number | string) => {
    return useQuery({
        queryKey: ["digital-lecture", "classes", classId, "subjects"],
        queryFn: async () => {
            const response = await axiosInstance.get<GetSubjectsResponse>(
                `/digital-lecture/classes/${classId}/subjects`
            );
            return response.data;
        },
        enabled: !!classId,
    });
};

/**
 * Hook để lấy danh mục (Book + Topics) theo lớp và môn học
 * GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/categories
 */
export const useGetLectureCategories = (
    classId: number | string,
    subjectId: number | string
) => {
    return useQuery({
        queryKey: [
            "digital-lecture",
            "classes",
            classId,
            "subjects",
            subjectId,
            "categories",
        ],
        queryFn: async () => {
            const response = await axiosInstance.get<GetCategoriesResponse>(
                `/digital-lecture/classes/${classId}/subjects/${subjectId}/categories`
            );
            return response.data;
        },
        enabled: !!classId && !!subjectId,
    });
};

/**
 * Hook để lấy danh sách bài giảng theo lớp, môn học, và có thể filter theo topicId
 * GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/lessons
 *
 * @returns {data, pagination} - data là danh sách bài giảng, pagination là thông tin phân trang
 */
export const useGetLectureLessons = (
    classId: number | string,
    subjectId: number | string,
    params?: GetLessonsParams
) => {
    return useQuery<{
        data: GetLessonsResponse;
        pagination: PaginationMeta | null;
    }>({
        queryKey: [
            "digital-lecture",
            "classes",
            classId,
            "subjects",
            subjectId,
            "lessons",
            params,
        ],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (params?.topicId) {
                searchParams.append("topicId", params.topicId.toString());
            }
            if (params?.page) {
                searchParams.append("page", params.page.toString());
            }
            if (params?.limit) {
                searchParams.append("limit", params.limit.toString());
            }

            const queryString = searchParams.toString();
            const url = `/digital-lecture/classes/${classId}/subjects/${subjectId}/lessons${queryString ? `?${queryString}` : ""
                }`;

            // axiosInstance.get() trả về ApiSuccessResponse<GetLessonsResponse>
            // response.data = LectureLesson[]
            // response.pagination = PaginationMeta | null
            const response = await axiosInstance.get<GetLessonsResponse>(url);
            return {
                data: response.data,
                pagination: response.pagination || null,
            };
        },
        enabled: !!classId && !!subjectId,
    });
};

/**
 * Hook để lấy chi tiết một bài giảng
 * GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/lessons/[lessonId]
 */
export const useGetLectureLessonDetail = (
    classId: number | string,
    subjectId: number | string,
    lessonId: number | string
) => {
    return useQuery({
        queryKey: [
            "digital-lecture",
            "classes",
            classId,
            "subjects",
            subjectId,
            "lessons",
            lessonId,
        ],
        queryFn: async () => {
            const response = await axiosInstance.get<GetLessonDetailResponse>(
                `/digital-lecture/classes/${classId}/subjects/${subjectId}/lessons/${lessonId}`
            );
            return response.data;
        },
        enabled: !!classId && !!subjectId && !!lessonId,
    });
};
