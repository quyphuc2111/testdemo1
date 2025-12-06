'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Lesson {
    id: number;
    lessonName: string;
    gradeId: number;
    subjectId: number;
    bookId: number;
    topicId: number;
    lectureUrl?: string;
    grade?: { name: string };
    subject?: { name: string };
    book?: { name: string };
    topic?: { topicName: string };
}

interface Grade {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
}

interface Book {
    id: number;
    name: string;
}

interface Topic {
    id: number;
    topicName: string;
    gradeId: number;
    subjectId: number;
    bookId: number;
}

const LessonsPage = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        lessonName: '',
        gradeId: '',
        subjectId: '',
        bookId: '',
        topicId: '',
        lectureUrl: '',
    });

    useEffect(() => {
        fetchLessons();
        fetchGrades();
        fetchSubjects();
        fetchBooks();
        fetchTopics();
    }, []);

    useEffect(() => {
        // Filter topics based on selected grade, subject, and book
        if (formData.gradeId && formData.subjectId && formData.bookId) {
            const filtered = topics.filter(
                (topic) =>
                    topic.gradeId === parseInt(formData.gradeId) &&
                    topic.subjectId === parseInt(formData.subjectId) &&
                    topic.bookId === parseInt(formData.bookId)
            );
            setFilteredTopics(filtered);
        } else {
            setFilteredTopics([]);
        }
    }, [formData.gradeId, formData.subjectId, formData.bookId, topics]);

    const fetchLessons = async () => {
        try {
            const response = await fetch('/api/admin/lessons');
            const result = await response.json();
            setLessons(result.data || []);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGrades = async () => {
        try {
            const response = await fetch('/api/admin/grades');
            const result = await response.json();
            setGrades(result.data || []);
        } catch (error) {
            console.error('Error fetching grades:', error);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await fetch('/api/admin/subjects');
            const result = await response.json();
            setSubjects(result.data || []);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const fetchBooks = async () => {
        try {
            const response = await fetch('/api/admin/books');
            const result = await response.json();
            setBooks(result.data || []);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchTopics = async () => {
        try {
            const response = await fetch('/api/admin/topics');
            const result = await response.json();
            setTopics(result.data || []);
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/admin/lessons/${editingId}` : '/api/admin/lessons';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lessonName: formData.lessonName,
                    gradeId: parseInt(formData.gradeId),
                    subjectId: parseInt(formData.subjectId),
                    bookId: parseInt(formData.bookId),
                    topicId: parseInt(formData.topicId),
                    lectureUrl: formData.lectureUrl || null,
                }),
            });

            if (response.ok) {
                fetchLessons();
                setShowModal(false);
                setFormData({
                    lessonName: '',
                    gradeId: '',
                    subjectId: '',
                    bookId: '',
                    topicId: '',
                    lectureUrl: '',
                });
                setEditingId(null);
            }
        } catch (error) {
            console.error('Error saving lesson:', error);
        }
    };

    const handleEdit = (lesson: Lesson) => {
        setEditingId(lesson.id);
        setFormData({
            lessonName: lesson.lessonName,
            gradeId: lesson.gradeId.toString(),
            subjectId: lesson.subjectId.toString(),
            bookId: lesson.bookId.toString(),
            topicId: lesson.topicId.toString(),
            lectureUrl: lesson.lectureUrl || '',
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa bài học này?')) return;

        try {
            const response = await fetch(`/api/admin/lessons/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchLessons();
            }
        } catch (error) {
            console.error('Error deleting lesson:', error);
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({
            lessonName: '',
            gradeId: '',
            subjectId: '',
            bookId: '',
            topicId: '',
            lectureUrl: '',
        });
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin"
                            className="p-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            <ArrowLeft className="w-6 h-6 text-white" />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                                <FileText className="w-10 h-10" />
                                Quản Lý Bài Học
                            </h1>
                            <p className="text-gray-300 mt-1">
                                Quản lý các bài học và bài giảng
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        Thêm Bài Học
                    </button>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                            ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                            Tên Bài Học
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                            Khối Lớp
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                            Môn Học
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                            Sách
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                            Chủ Đề
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                            Bài Giảng
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">
                                            Thao Tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {lessons.map((lesson) => (
                                        <tr
                                            key={lesson.id}
                                            className="hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 text-gray-300">{lesson.id}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-white font-medium">
                                                    {lesson.lessonName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                                                    {lesson.grade?.name || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                                                    {lesson.subject?.name || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm">
                                                    {lesson.book?.name || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
                                                    {lesson.topic?.topicName || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {lesson.lectureUrl ? (
                                                    <a
                                                        href={lesson.lectureUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        <span className="text-sm">Xem</span>
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500 text-sm">Chưa có</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(lesson)}
                                                        className="p-2 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 transition-all duration-200"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(lesson.id)}
                                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-200"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-white/20 max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                {editingId ? 'Sửa Bài Học' : 'Thêm Bài Học Mới'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Tên Bài Học
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lessonName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, lessonName: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        placeholder="Ví dụ: Bài 1: Phép cộng"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Khối Lớp
                                    </label>
                                    <select
                                        value={formData.gradeId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, gradeId: e.target.value, topicId: '' })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                    >
                                        <option value="">Chọn khối lớp</option>
                                        {grades.map((grade) => (
                                            <option key={grade.id} value={grade.id}>
                                                {grade.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Môn Học
                                    </label>
                                    <select
                                        value={formData.subjectId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, subjectId: e.target.value, topicId: '' })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                    >
                                        <option value="">Chọn môn học</option>
                                        {subjects.map((subject) => (
                                            <option key={subject.id} value={subject.id}>
                                                {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Sách
                                    </label>
                                    <select
                                        value={formData.bookId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, bookId: e.target.value, topicId: '' })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                    >
                                        <option value="">Chọn sách</option>
                                        {books.map((book) => (
                                            <option key={book.id} value={book.id}>
                                                {book.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Chủ Đề
                                    </label>
                                    <select
                                        value={formData.topicId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, topicId: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                        disabled={filteredTopics.length === 0}
                                    >
                                        <option value="">
                                            {filteredTopics.length === 0
                                                ? 'Vui lòng chọn khối lớp, môn học và sách trước'
                                                : 'Chọn chủ đề'}
                                        </option>
                                        {filteredTopics.map((topic) => (
                                            <option key={topic.id} value={topic.id}>
                                                {topic.topicName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        URL Bài Giảng (Tùy chọn)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lectureUrl}
                                        onChange={(e) =>
                                            setFormData({ ...formData, lectureUrl: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        placeholder="https://example.com/lecture.pdf"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-200"
                                    >
                                        {editingId ? 'Cập Nhật' : 'Thêm Mới'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonsPage;
