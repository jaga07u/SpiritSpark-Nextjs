/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Cookie from "js-cookie";

export default function page() {
  const route = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (data) => {
    try {
      const res = await axios.post(
        "https://spirit-spark-backendv2.onrender.com/api/v1/user/signin",
        data,
        { withCredentials: true }
      );
      toast.success("Logged In Successfully");
      Cookie.set("accessToken", res.data.data.data.Token, { path: "/", expires: 1 });
      route.push("/");
    } catch (error) {
      console.log("Invalid credentials", error);
      setError(true);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      const { email, name, picture, sub } = decoded;

      const res = await axios.post(
        "https://spirit-spark-backendv2.onrender.com/api/v1/user/google-auth",
        {
          email,
          name,
          avatar: picture,
          googleId: sub,
        },
        { withCredentials: true }
      );

      Cookie.set("accessToken", res.data.data.token, { path: "/", expires: 1 });
      toast.success("Logged in with Google");
      route.push("/");
    } catch (error) {
      console.error("Google login error", error);
      toast.error("Google login failed");
    }
  };

  return (
    <section className="bg-white w-[100vw] h-[100vh]">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <Image src="/LOGO2.jpg" width={70} height={70} alt="Logo" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>

          {error && (
            <h1 className="text-red-600 font-bold text-center text-3xl">
              Invalid Credentials
            </h1>
          )}

          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <div>
                <label className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+\.\S+$/,
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <Link href="/forgotpassword" className="text-sm font-semibold text-black hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-10 px-3 py-2 pr-10 rounded-md border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    {...register("password", { required: true })}
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  {errors.password && (
                    <span className="text-red-600">Password required</span>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white px-3.5 py-2.5 rounded-md font-semibold hover:bg-black/80"
                >
                  Get started <ArrowRight className="ml-2 inline" size={16} />
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
              useOneTap
            />
          </div>
        </div>
      </div>
    </section>
  );
}
