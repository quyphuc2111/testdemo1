'use client';

import { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ImportStats {
    schoolLevels: number;
    grades: number;
    subjects: number;
    books: number;
    topics: number;
    lessons: number;
    errors: string[];
}

interface ImportTopicsLessonsStats {
    grades: number;
    subjects: number;
    books: number;
    topicsCreated: number;
    topicsUpdated: number;
    lessonsCreated: number;
    lessonsUpdated: number;
    errors: string[];
}

const ImportExcelPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        stats?: ImportStats;
    } | null>(null);

    // State for topics/lessons import
    const [topicsFile, setTopicsFile] = useState<File | null>(null);
    const [uploadingTopics, setUploadingTopics] = useState(false);
    const [topicsResult, setTopicsResult] = useState<{
        success: boolean;
        message: string;
        stats?: ImportTopicsLessonsStats;
    } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResult(null);
        }
    };

    const handleTopicsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setTopicsFile(e.target.files[0]);
            setTopicsResult(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/admin/import-excel', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setResult({
                    success: true,
                    message: data.message,
                    stats: data.stats,
                });
                setFile(null);
            } else {
                setResult({
                    success: false,
                    message: data.error || 'Có lỗi xảy ra',
                });
            }
        } catch (error) {
            setResult({
                success: false,
                message: 'Không thể kết nối đến server',
            });
        } finally {
            setUploading(false);
        }
    };

    const handleTopicsUpload = async () => {
        if (!topicsFile) return;

        setUploadingTopics(true);
        setTopicsResult(null);

        try {
            const formData = new FormData();
            formData.append('file', topicsFile);

            const response = await fetch('/api/admin/import-topics-lessons', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setTopicsResult({
                    success: true,
                    message: data.message,
                    stats: data.stats,
                });
                setTopicsFile(null);
            } else {
                setTopicsResult({
                    success: false,
                    message: data.error || 'Có lỗi xảy ra',
                });
            }
        } catch (error) {
            setTopicsResult({
                success: false,
                message: 'Không thể kết nối đến server',
            });
        } finally {
            setUploadingTopics(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/admin"
                        className="p-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                            <FileSpreadsheet className="w-10 h-10" />
                            Import Dữ Liệu Excel
                        </h1>
                        <p className="text-gray-300 mt-1">
                            Tải lên file Excel để import dữ liệu hàng loạt
                        </p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Upload Card */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Tải lên file Excel</h2>

                        {/* Format Guide */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                            <h3 className="text-blue-300 font-semibold mb-2">📋 Định dạng file Excel:</h3>
                            <ul className="text-gray-300 text-sm space-y-1">
                                <li>• <strong>school_level</strong>: Cấp học (VD: Tiểu học, THCS)</li>
                                <li>• <strong>class</strong>: Lớp (VD: Lớp 1, Lớp 6)</li>
                                <li>• <strong>subject</strong>: Môn học (VD: Toán, Văn)</li>
                                <li>• <strong>book</strong>: Sách (VD: Kết nối tri thức với cuộc sống)</li>
                                <li>• <strong>topic_name</strong>: Tên chủ đề (Tùy chọn)</li>
                                <li>• <strong>lesson_name</strong>: Tên bài học (Tùy chọn)</li>
                            </ul>
                        </div>

                        {/* File Input */}
                        <div className="mb-6">
                            <label className="block text-gray-300 mb-3 font-medium">
                                Chọn file Excel (.xlsx, .xls)
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="excel-file"
                                />
                                <label
                                    htmlFor="excel-file"
                                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                                >
                                    <Upload className="w-6 h-6 text-blue-400" />
                                    <span className="text-white">
                                        {file ? file.name : 'Click để chọn file'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Upload Button */}
                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Import Dữ Liệu
                                </>
                            )}
                        </button>
                    </div>

                    {/* Result */}
                    {result && (
                        <div
                            className={`bg-white/10 backdrop-blur-lg border rounded-2xl p-6 mb-6 ${result.success
                                ? 'border-green-500/50'
                                : 'border-red-500/50'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                {result.success ? (
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                ) : (
                                    <XCircle className="w-8 h-8 text-red-400" />
                                )}
                                <h3
                                    className={`text-xl font-bold ${result.success ? 'text-green-300' : 'text-red-300'
                                        }`}
                                >
                                    {result.message}
                                </h3>
                            </div>

                            {result.stats && (
                                <div className="space-y-2">
                                    <h4 className="text-white font-semibold mb-3">Thống kê:</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Cấp học</div>
                                            <div className="text-white text-2xl font-bold">
                                                {result.stats.schoolLevels}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Khối lớp</div>
                                            <div className="text-white text-2xl font-bold">
                                                {result.stats.grades}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Môn học</div>
                                            <div className="text-white text-2xl font-bold">
                                                {result.stats.subjects}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Sách</div>
                                            <div className="text-white text-2xl font-bold">
                                                {result.stats.books}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Chủ đề</div>
                                            <div className="text-white text-2xl font-bold">
                                                {result.stats.topics}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Bài học</div>
                                            <div className="text-white text-2xl font-bold">
                                                {result.stats.lessons}
                                            </div>
                                        </div>
                                    </div>

                                    {result.stats.errors.length > 0 && (
                                        <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                            <h5 className="text-red-300 font-semibold mb-2">
                                                Lỗi ({result.stats.errors.length}):
                                            </h5>
                                            <ul className="text-red-200 text-sm space-y-1 max-h-40 overflow-y-auto">
                                                {result.stats.errors.map((error, index) => (
                                                    <li key={index}>• {error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Topics & Lessons Import Section */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Import Chủ Đề & Bài Học</h2>

                        {/* Format Guide */}
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
                            <h3 className="text-purple-300 font-semibold mb-2">📋 Định dạng file Excel:</h3>
                            <ul className="text-gray-300 text-sm space-y-1">
                                <li>• <strong>class</strong>: Lớp (VD: Lớp 1, Lớp 6) - <span className="text-red-300">Bắt buộc</span></li>
                                <li>• <strong>subject</strong>: Môn học (VD: Toán, Văn) - Tùy chọn</li>
                                <li>• <strong>book</strong>: Sách (VD: Kết nối tri thức) - <span className="text-red-300">Bắt buộc</span></li>
                                <li>• <strong>topic_name</strong>: Tên chủ đề - <span className="text-red-300">Bắt buộc</span></li>
                                <li>• <strong>lesson_name</strong>: Tên bài học - <span className="text-red-300">Bắt buộc</span></li>
                            </ul>
                            <div className="mt-3 text-yellow-300 text-sm">
                                ⚠️ Lưu ý: File này chỉ dùng để thêm/cập nhật topic_name và lesson_name cho dữ liệu đã có
                            </div>
                        </div>

                        {/* File Input */}
                        <div className="mb-6">
                            <label className="block text-gray-300 mb-3 font-medium">
                                Chọn file Excel (.xlsx, .xls)
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleTopicsFileChange}
                                    className="hidden"
                                    id="topics-excel-file"
                                />
                                <label
                                    htmlFor="topics-excel-file"
                                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                                >
                                    <Upload className="w-6 h-6 text-purple-400" />
                                    <span className="text-white">
                                        {topicsFile ? topicsFile.name : 'Click để chọn file'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Upload Button */}
                        <button
                            onClick={handleTopicsUpload}
                            disabled={!topicsFile || uploadingTopics}
                            className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {uploadingTopics ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Import Chủ Đề & Bài Học
                                </>
                            )}
                        </button>
                    </div>

                    {/* Topics/Lessons Result */}
                    {topicsResult && (
                        <div
                            className={`bg-white/10 backdrop-blur-lg border rounded-2xl p-6 ${topicsResult.success
                                ? 'border-green-500/50'
                                : 'border-red-500/50'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                {topicsResult.success ? (
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                ) : (
                                    <XCircle className="w-8 h-8 text-red-400" />
                                )}
                                <h3
                                    className={`text-xl font-bold ${topicsResult.success ? 'text-green-300' : 'text-red-300'
                                        }`}
                                >
                                    {topicsResult.message}
                                </h3>
                            </div>

                            {topicsResult.stats && (
                                <div className="space-y-2">
                                    <h4 className="text-white font-semibold mb-3">Thống kê:</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Khối lớp</div>
                                            <div className="text-white text-2xl font-bold">
                                                {topicsResult.stats.grades}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Môn học</div>
                                            <div className="text-white text-2xl font-bold">
                                                {topicsResult.stats.subjects}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Sách</div>
                                            <div className="text-white text-2xl font-bold">
                                                {topicsResult.stats.books}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Chủ đề mới</div>
                                            <div className="text-green-400 text-2xl font-bold">
                                                {topicsResult.stats.topicsCreated}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Chủ đề cập nhật</div>
                                            <div className="text-blue-400 text-2xl font-bold">
                                                {topicsResult.stats.topicsUpdated}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Bài học mới</div>
                                            <div className="text-green-400 text-2xl font-bold">
                                                {topicsResult.stats.lessonsCreated}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <div className="text-gray-400 text-sm">Bài học cập nhật</div>
                                            <div className="text-blue-400 text-2xl font-bold">
                                                {topicsResult.stats.lessonsUpdated}
                                            </div>
                                        </div>
                                    </div>

                                    {topicsResult.stats.errors.length > 0 && (
                                        <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                            <h5 className="text-red-300 font-semibold mb-2">
                                                Lỗi ({topicsResult.stats.errors.length}):
                                            </h5>
                                            <ul className="text-red-200 text-sm space-y-1 max-h-40 overflow-y-auto">
                                                {topicsResult.stats.errors.map((error, index) => (
                                                    <li key={index}>• {error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImportExcelPage;
