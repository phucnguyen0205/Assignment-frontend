"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Mail, User, Key, Loader2 } from "lucide-react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const authSchema = z.object({
  email: z.string().min(3, "Username tối thiểu 3 ký tự"),
  password: z.string().min(3, "Password tối thiểu 3 ký tự"),
});
type AuthInput = z.infer<typeof authSchema>;

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (data: AuthInput) => {
    try {
      setIsLoading(true);

      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 60
        }),
      });

      const result = await res.json();

      if (!res.ok) return alert("Sai tài khoản hoặc mật khẩu!");

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      window.dispatchEvent(new Event("auth-change"));

      window.location.href = "/";
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      alert("Đăng ký thành công (tài khoản ảo). Hệ thống sẽ tự login bằng tài khoản emilys!");

      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 60
        }),
      });

      const result = await res.json();

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      window.dispatchEvent(new Event("auth-change"));

      window.location.href = "/";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen font-sans">
      
      <div className="relative h-[250px] w-full flex items-center overflow-hidden">
        <Image src="/assets/img/banner/breadcrumb-01.jpg" alt="Breadcrumb" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Sign In</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          
          <div className="bg-white rounded-3xl shadow border border-gray-100 overflow-hidden">
            <div className="relative h-60 w-full">
              <Image src="/assets/img/banner/login-bg.jpg" alt="Login" fill className="object-cover" />
            </div>

            <div className="p-10">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <Lock className="text-[#C3293E]" /> Login
              </h2>

              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">

                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <FormControl>
                          <Input placeholder="Username (emilys)" {...field} className="pl-12 h-14 bg-gray-50 rounded-2xl" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} className="pl-12 h-14 bg-gray-50 rounded-2xl" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button disabled={isLoading} className="w-full h-14 bg-[#C3293E] text-white rounded-2xl">
                    {isLoading ? <Loader2 className="animate-spin" /> : "Login Now"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow border border-gray-100 overflow-hidden">
            <div className="relative h-60 w-full">
              <Image src="/assets/img/banner/sign-bg.jpg" alt="Register" fill className="object-cover" />
            </div>

            <div className="p-10">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <Mail className="text-[#C3293E]" /> Register
              </h2>

              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-5">

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <FormControl>
                          <Input placeholder="Email" {...field} className="pl-12 h-14 bg-gray-50 rounded-2xl" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} className="pl-12 h-14 bg-gray-50 rounded-2xl" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button disabled={isLoading} className="w-full h-14 bg-[#F5F1EE] text-gray-800 rounded-2xl">
                    {isLoading ? <Loader2 className="animate-spin" /> : "Register Now"}
                  </Button>
                </form>
              </Form>

              <p className="mt-4 text-center text-xs text-gray-400 italic">
                * Đăng ký ảo - hệ thống sẽ tự login bằng tài khoản demo emilys.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}