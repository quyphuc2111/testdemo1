'use client';

import Link from 'next/link';
import {
    GraduationCap,
    BookOpen,
    BookMarked,
    Layers,
    FileText,
    School,
    FileSpreadsheet,
} from 'lucide-react';

const AdminPage = () => {
    const adminSections = [
        {
            title: 'Cấp Học',
            description: 'Quản lý các cấp học (Tiểu học, THCS, THPT)',
            icon: School,
            href: '/admin/school-levels',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Khối Lớp',
            description: 'Quản lý các khối lớp theo từng cấp học',
            icon: GraduationCap,
            href: '/admin/grades',
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Môn Học',
            description: 'Quản lý danh sách các môn học',
            icon: BookOpen,
            href: '/admin/subjects',
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Sách',
            description: 'Quản lý sách giáo khoa và tài liệu',
            icon: BookMarked,
            href: '/admin/books',
            color: 'from-orange-500 to-red-500',
        },
        {
            title: 'Chủ Đề',
            description: 'Quản lý các chủ đề học tập',
            icon: Layers,
            href: '/admin/topics',
            color: 'from-indigo-500 to-blue-500',
        },
        {
            title: 'Bài Học',
            description: 'Quản lý các bài học và bài giảng',
            icon: FileText,
            href: '/admin/lessons',
            color: 'from-pink-500 to-rose-500',
        },
        {
            title: 'Import Excel',
            description: 'Tải lên file Excel để import dữ liệu hàng loạt',
            icon: FileSpreadsheet,
            href: '/admin/import-excel',
            color: 'from-teal-500 to-cyan-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Trang Quản Trị
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Quản lý nội dung học tập và giáo dục
                    </p>
                </div>

                {/* Grid of Admin Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {adminSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Link
                                key={section.href}
                                href={section.href}
                                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl hover:shadow-purple-500/50"
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${section.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                                        {section.title}
                                    </h3>

                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {section.description}
                                    </p>

                                    {/* Arrow Icon */}
                                    <div className="mt-4 flex items-center text-blue-400 group-hover:text-purple-400 transition-colors duration-300">
                                        <span className="text-sm font-medium">Quản lý</span>
                                        <svg
                                            className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-gray-300 text-sm">Hệ thống đang hoạt động</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;