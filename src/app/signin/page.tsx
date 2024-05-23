"use client";

import Link from "next/link";
// import jwt from 'jsonwebtoken';
// import { setCookie } from "nookies";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie, parseCookies } from "nookies"; // Added parseCookies
import * as yup from "yup";
import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import useLocalStorage from "@/hooks/useLocalStorage";

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

const isFirebaseError = (error: any): error is { code: string; message: string } => {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface FormValues {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onFormSubmit = handleSubmit(async (data: FormValues) => {
    try {
      console.log("here___________________", data);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const token = await userCredential.user.getIdToken();
      setCookie(null, "token", token, { // Using nookies to set the token cookie
        maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
        path: '/',
      });
      router.push('/'); // Navigate programmatically
    } catch (error) {
      // Use the type guard to safely access error properties
      if (isFirebaseError(error)) {
        console.error("ERROR SIGNING IN:", error.code, error.message);
        if (error.code === "auth/invalid-credential") {
          alert("The email or password you entered is incorrect. Please try again or contact support if you are unable to access your account.");
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  });

  const cookies = parseCookies(); // Read cookies using nookies
  const token = cookies.token;
  if (token) {
    router.push('/');
    return null; // Prevent rendering during redirect
  }
  else
  return (
    <div className="flex h-full min-h-[100vh] w-full items-center justify-center p-10">
      <form onSubmit={onFormSubmit}>
        <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-start gap-[54px]">
          <h5 className="text-center text-[36px] font-semibold text-[#4F4F4F]">
            Welcome, Log into your account
          </h5>
          <div className="mx-auto flex min-h-[382px] w-full max-w-[512px] items-start  justify-center bg-white py-[50px] pt-[50px] pb-[40px]">
            <div className="flex w-full max-w-[248px] flex-col items-center justify-start gap-[14px]">
              <p className="text=[#667085] text-center text-[16px] font-medium leading-[25px]">
                It is our great pleasure to have you on board!
              </p>

              <div className="flex w-full flex-col items-start justify-start gap-4">
                <input
                  className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className=" text-[14px] text-red ">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-4">
                <input
                  className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.email && (
                  <p className=" text-[14px] text-red ">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <button
                className="w-full rounded bg-blue px-4 py-3 text-[14px] font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
                type="submit"
              >
                Login
              </button>

              <div className="flex w-full items-center justify-center gap-1">
                <p className="text-[12px] font-bold leading-[24px] text-[#667085] ">
                  Already have an account?
                </p>
                <Link
                  href="/signup"
                  className="text-[12px] font-bold leading-[24px] text-blue "
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
