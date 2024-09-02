/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { GoogleOAuthProvider,useGoogleOneTapLogin,GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {useForm,SubmitHandler } from "react-hook-form"
import {toast} from "react-hot-toast"
import Cookie from "js-cookie"

export default function page() {
    const route=useRouter();
    const {register,handleSubmit,formState:{errors}}=useForm();
    const [error,setError]=useState(false);
    const login=async(data)=>{
     // console.log(data);
     const token = Cookie.get('accessToken');
  
     if(data.password != data.confirmPassword){
        toast.error("password and confirm password must be same");
        return ;
     }
      try {
        console.log(data);
        
        const res=await axios.patch("https://spirit-spark-backendv2.onrender.com/api/v1/user/forgotpassword",data,{withCredentials:true,headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
      }});
          console.log(res.data);
          toast.success("Password Changed successfully");
           route.push('/login');
      } catch (error) {
        console.log("invalid credentials",error);
        setError(true);
      }
    }
  return (
    <section className="bg-white w-[100vw] h-[100vh]">
      
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <Image
      src="/LOGO2.jpg"
      width={70}
      height={70}
      alt="Picture of the author"
    />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t want to change password{' '}
            <Link
              href="/login"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
             signin
            </Link>
          </p>
        
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    {...register("email",{required:true,pattern:/^\S+@\S+\.\S+$/
                    })}
                    // value={user.email}
                    // onChange={(e)=>setUser({...user,email:e.target.value})}
                  ></input>
                  {errors.email && <span className="text-red-600">Email is required</span>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  {/* <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </a> */}
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    {...register("password",{required:true
                   })}
                    // value={user.password}
                    // onChange={(e)=>setUser({...user,password:e.target.value})}
                  ></input>
                  {errors.password && <span className="text-red-600">Password required</span>}
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Confirm Password{' '}
                  </label>
                  {/* <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </a> */}
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword",{required:true
                   })}
                    // value={user.password}
                    // onChange={(e)=>setUser({...user,password:e.target.value})}
                  ></input>
                  {errors.password && <span className="text-red-600">Confirm Password required</span>}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Change Password <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
          {/* <GoogleLogin
  onSuccess={async(credentialResponse) => {
    console.log(credentialResponse);
    // const res=await axios.post("/api/users/signup",jwtDecode(credentialResponse?.credential));
    // console.log(res.data);
    route.push("/profile");
  }} /> */}
            {/* <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-[#2563EB]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </span>
              Sign in with Facebook
            </button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
