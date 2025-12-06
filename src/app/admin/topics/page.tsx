'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Topic {
    id: number;
    topicName: string;
    gradeId: number;
    subjectId: number;
    bookId: number;
    grade?: { name: string };
    subject?: { name: string };
    book?: { name: string };
    lessons?: any[];
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

const TopicsPage = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        topicName: '',
        gradeId: '',
        subjectId: '',
        bookId: '',
    });

    useEffect(() => {
        fetchTopics();
        fetchGrades();
        fetchSubjects();
        fetchBooks();
    }, []);

    const fetchTopics = async () => {
        try {
            const response = await fetch('/api/admin/topics');
            const result = await response.json();
            setTopics(result.data || []);
        } catch (error) {
            console.error('Error fetching topics:', error);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/admin/topics/${editingId}` : '/api/admin/topics';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topicName: formData.topicName,
                    gradeId: parseInt(formData.gradeId),
                    subjectId: parseInt(formData.subjectId),
                    bookId: parseInt(formData.bookId),
                }),
            });

            if (response.ok) {
                fetchTopics();
                setShowModal(false);
                setFormData({ topicName: '', gradeId: '', subjectId: '', bookId: '' });
                setEditingId(null);
            }
        } catch (error) {
            console.error('Error saving topic:', error);
        }
    };

    const handleEdit = (topic: Topic) => {
        setEditingId(topic.id);
        setFormData({
            topicName: topic.topicName,
            gradeId: topic.gradeId.toString(),
            subjectId: topic.subjectId.toString(),
            bookId: topic.bookId.toString(),
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa chủ đề này?')) return;

        try {
            const response = await fetch(`/api/admin/topics/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchTopics();
            }
        } catch (error) {
            console.error('Error deleting topic:', error);
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ topicName: '', gradeId: '', subjectId: '', bookId: '' });
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
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
                                <Layers className="w-10 h-10" />
                                Quản Lý Chủ Đề
                            </h1>
                            <p className="text-gray-300 mt-1">
                                Quản lý các chủ đề học tập
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        Thêm Chủ Đề
                    </button>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
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
                                            Tên Chủ Đề
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
                                            Số Bài Học
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">
                                            Thao Tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {topics.map((topic) => (
                                        <tr
                                            key={topic.id}
                                            className="hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 text-gray-300">{topic.id}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-white font-medium">
                                                    {topic.topicName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                                                    {topic.grade?.name || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                                                    {topic.subject?.name || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm">
                                                    {topic.book?.name || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">
                                                {topic.lessons?.length || 0}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(topic)}
                                                        className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all duration-200"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(topic.id)}
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
                                {editingId ? 'Sửa Chủ Đề' : 'Thêm Chủ Đề Mới'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Tên Chủ Đề
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.topicName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, topicName: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Ví dụ: Số học, Hình học"
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
                                            setFormData({ ...formData, gradeId: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                            setFormData({ ...formData, subjectId: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                <div className="mb-6">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Sách
                                    </label>
                                    <select
                                        value={formData.bookId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, bookId: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200"
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

export default TopicsPage;
