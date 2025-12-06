'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Subject {
    id: number;
    subjectName: string;
    topics?: any[];
    lessons?: any[];
}

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '' });

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await fetch('/api/admin/subjects');
            const result = await response.json();
            setSubjects(result.data || []);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId
                ? `/api/admin/subjects/${editingId}`
                : '/api/admin/subjects';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchSubjects();
                setShowModal(false);
                setFormData({ name: '' });
                setEditingId(null);
            }
        } catch (error) {
            console.error('Error saving subject:', error);
        }
    };

    const handleEdit = (subject: Subject) => {
        setEditingId(subject.id);
        setFormData({ name: subject.subjectName });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa môn học này?')) return;

        try {
            const response = await fetch(`/api/admin/subjects/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchSubjects();
            }
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ name: '' });
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
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
                                <BookOpen className="w-10 h-10" />
                                Quản Lý Môn Học
                            </h1>
                            <p className="text-gray-300 mt-1">
                                Quản lý danh sách các môn học
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        Thêm Môn Học
                    </button>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                        Tên Môn Học
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                        Số Chủ Đề
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
                                {subjects.map((subject) => (
                                    <tr
                                        key={subject.id}
                                        className="hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 text-gray-300">{subject.id}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-white font-medium">
                                                {subject.subjectName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {subject.topics?.length || 0}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {subject.lessons?.length || 0}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(subject)}
                                                    className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all duration-200"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(subject.id)}
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
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                {editingId ? 'Sửa Môn Học' : 'Thêm Môn Học Mới'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Tên Môn Học
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Ví dụ: Toán, Văn, Anh"
                                        required
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
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all duration-200"
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

export default SubjectsPage;
