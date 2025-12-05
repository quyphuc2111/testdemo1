"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập địa chỉ email hợp lệ.",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    setIsLoading(false);
    router.push("/");
  }

  return (
    <div className="flex relative justify-center items-center px-4 w-full min-h-screen bg-linear-to-br from-[#E4F5FC] to-[#AFE2F6]">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="flex absolute top-4 left-4 gap-2 items-center text-sm font-medium transition-colors sm:top-8 sm:left-8 sm:text-base text-[#004C70] hover:text-[#003855]"
      >
        <FaArrowLeft />
        <span className="md:inline sm:hidden">Quay lại trang chủ</span>
      </Link>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl text-[#004C70]">
            Welcome Back!
          </h1>
          <p className="text-sm text-slate-500 sm:text-base">
            Đăng nhập để truy cập hệ thống BKT LMS
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-slate-600">
              Tên tài khoản / email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...form.register("email")}
              className={`h-11 bg-white/50 border-slate-200 transition-all ${
                form.formState.errors.email ? "border-red-500" : ""
              }`}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="font-medium text-slate-600">
                Mật khẩu
              </Label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#004C70] hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
              className={`h-11 bg-white/50 border-slate-200 focus-visible:ring-[#004C70] focus-visible:border-[#004C70] transition-all ${
                form.formState.errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold text-white shadow-lg transition-all bg-linear-to-r from-[#004C70] to-[#006696] hover:from-[#003855] hover:to-[#004C70] shadow-[#004C70]/20 hover:shadow-[#004C70]/40 rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 rounded-full border-2 border-white animate-spin border-t-transparent" />
                Đang đăng nhập...
              </div>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="flex absolute inset-0 items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="flex relative justify-center text-xs uppercase">
            <span className="px-4 backdrop-blur-xl text-slate-400 bg-white/0">
              Hoặc đăng nhập với
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="w-full h-11 bg-gray-200 border-2 transition-all border-slate-300 text-slate-700 hover:bg-gray-300">
            <FaGoogle className="mr-2 w-4 h-4 text-red-500" />
            Google
          </Button>
        </div>

        <p className="mt-8 text-sm text-center text-slate-600">
          Bạn chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="font-bold text-[#004C70] hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
