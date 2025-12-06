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

const ImportExcelPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        stats?: ImportStats;
    } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResult(null);
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
                            className={`bg-white/10 backdrop-blur-lg border rounded-2xl p-6 ${result.success
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
                </div>
            </div>
        </div>
    );
};

export default ImportExcelPage;
