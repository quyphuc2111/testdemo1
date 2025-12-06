'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GraduationCap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Grade {
    id: number;
    gradeName: string;
    image?: string;
    schoolLevelId: number;
    schoolLevel?: {
        id: number;
        levelName: string;
    };
}

interface SchoolLevel {
    id: number;
    levelName: string;
}

const GradesPage = () => {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [schoolLevels, setSchoolLevels] = useState<SchoolLevel[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        schoolLevelId: '',
    });

    useEffect(() => {
        fetchGrades();
        fetchSchoolLevels();
    }, []);

    const fetchGrades = async () => {
        try {
            const response = await fetch('/api/admin/grades');
            const result = await response.json();
            setGrades(result.data || []);
        } catch (error) {
            console.error('Error fetching grades:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSchoolLevels = async () => {
        try {
            const response = await fetch('/api/admin/school-levels');
            const result = await response.json();
            setSchoolLevels(result.data || []);
        } catch (error) {
            console.error('Error fetching school levels:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/admin/grades/${editingId}` : '/api/admin/grades';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    image: formData.image || null,
                    schoolLevelId: parseInt(formData.schoolLevelId),
                }),
            });

            if (response.ok) {
                fetchGrades();
                setShowModal(false);
                setFormData({ name: '', image: '', schoolLevelId: '' });
                setEditingId(null);
            }
        } catch (error) {
            console.error('Error saving grade:', error);
        }
    };

    const handleEdit = (grade: Grade) => {
        setEditingId(grade.id);
        setFormData({
            name: grade.gradeName,
            image: grade.image || '',
            schoolLevelId: grade.schoolLevelId.toString(),
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa khối lớp này?')) return;

        try {
            const response = await fetch(`/api/admin/grades/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchGrades();
            }
        } catch (error) {
            console.error('Error deleting grade:', error);
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ name: '', image: '', schoolLevelId: '' });
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
                                <GraduationCap className="w-10 h-10" />
                                Quản Lý Khối Lớp
                            </h1>
                            <p className="text-gray-300 mt-1">
                                Quản lý các khối lớp theo từng cấp học
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        Thêm Khối Lớp
                    </button>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
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
                                        Tên Khối Lớp
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                        Cấp Học
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                                        Hình Ảnh
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">
                                        Thao Tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {grades.map((grade) => (
                                    <tr
                                        key={grade.id}
                                        className="hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 text-gray-300">{grade.id}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-white font-medium">
                                                {grade.gradeName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                                                {grade.schoolLevel?.levelName || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {grade.image ? (
                                                <img
                                                    src={grade.image}
                                                    alt={grade.gradeName}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-500">Không có</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(grade)}
                                                    className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all duration-200"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(grade.id)}
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
                                {editingId ? 'Sửa Khối Lớp' : 'Thêm Khối Lớp Mới'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Tên Khối Lớp
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Ví dụ: Lớp 1, Lớp 6, Lớp 10"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Cấp Học
                                    </label>
                                    <select
                                        value={formData.schoolLevelId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, schoolLevelId: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    >
                                        <option value="">Chọn cấp học</option>
                                        {schoolLevels.map((level) => (
                                            <option key={level.id} value={level.id}>
                                                {level.levelName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        URL Hình Ảnh (Tùy chọn)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) =>
                                            setFormData({ ...formData, image: e.target.value })
                                        }
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="https://example.com/image.jpg"
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
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
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

export default GradesPage;
