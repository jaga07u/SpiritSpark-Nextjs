/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { GoogleOAuthProvider,useGoogleOneTapLogin,GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {useForm,SubmitHandler} from "react-hook-form"
import {toast} from "react-hot-toast"
import Cookie from "js-cookie"


function Page() {
        const route=useRouter();
        const [error,setError]=useState(false);
        const {register,handleSubmit,formState:{errors}}=useForm(); 
        const token = Cookie.get('accessToken');
       const submitForm=async(data)=>{
        console.log(data);
        
        try {
          const res=await axios.post("https://spirit-spark-backendv2.onrender.com/api/v1/user/signup",data);
          console.log(res.data);
          toast.success("Thanks for register")
          route.push("/login");
        } catch (error) {
          console.log("something went Wrong",error);
          setError(true);
        }
       }
    return (
        <>
   <section className="bg-white">
   <Image
      src="/LOGO2.jpg"
      width={70}
      height={70}
      alt="Picture of the author"
    />
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
        {error && <h1 className="text-orange-500 font-semibold">Please Wait Some Server Error</h1>}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <form action="" className="mt-8"
            onSubmit={handleSubmit(submitForm)}>
              <div className="space-y-5">
              <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Username{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="username"
                      id="username"
                      {...register("username",{required:true, pattern: /^(?=(?:.*\d.*\d))[\w]+$/})}
                    ></input>
                  {errors.username?.type === "required" && (
  <span className="text-red-600">Username is required</span>
)}
{errors.username?.type === "pattern" && (
  <span className="text-red-600">Username must contain at least two digits and only letters, numbers, or underscores</span>
)}
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Full Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="fullname"
                      {...register("fullname",{required:true})}
                    ></input>
                     {errors.fullname && <span className="text-red-600">This field is required</span>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      {...register("email",{required:true,pattern:/^\S+@\S+\.\S+$/
                    })}
                      // value={users.email}
                      // onChange={(e)=>setUsers({...users,email:e.target.value}) }
                    ></input>
                     {errors.email && <span className="text-red-600">This field is required</span>}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      {...register("password",{required:true,minLength: 8,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                     })}
                      // value={users.password}
                      // onChange={(e)=>setUsers({...users,password:e.target.value}) }
                    ></input>
{errors.password && <span className="text-red-600">Password is required and must be at least 8 characters long, containing at least one lowercase letter, one uppercase letter, one digit, and one special character.</span>}
                  </div>
                </div>
                {/* <Select label="Age" {...register("Age")} /> */}
                <div>
                  <button
                  //onClick={Onsubmit}
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
            {/* <GoogleLogin
  onSuccess={async(credentialResponse) => {
    const decodeData=jwtDecode(credentialResponse?.credential);
    console.log(decodeData);
    users.username=decodeData.given_name;
    users.email=decodeData.email;
    users.fullname=decodeData.name;
    users.avatarImg=decodeData.picture;
    users.isVerify=decodeData.email_verified;
    const res=await axios.post("/api/users/googleAuth",users);
    console.log(res.data);
    route.push("/login");
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/> */}
{/* <button
onClick={login}
          type="button"
          class="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
        >
          <span className="mr-2 inline-block">
            <svg
              className="h-6 w-6 text-rose-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
          </span>
          Sign up with Google
        </button> */}
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
        </>
    )
}

export default Page