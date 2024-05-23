"use client";
import PageHeader from "@/components/PageHeader";
import TeamSection from "@/components/TeamSection";
import { useState, useEffect } from "react";
import StoriesSection from "@/components/StoriesSection";
// import { useRouter } from "next/navigation";
import { setCookie, parseCookies } from "nookies"; 


const DashBoard = () => {
  // const router = useRouter(); 
  const cookies = parseCookies(); // Read cookies using nookies
  const token = cookies.token;
  // const token = localStorage.getItem("token");

  // if (!token) {
  //   router.push("/signin"); 
  //   return null; 
  // }

  useEffect(() => {
    if (!token) {
        // router.push("/signin"); // Redirect to the sign-in page using Next.js's router
        window.location.href = "/signin";
      }
  }, [token]);

  return (
    <div className="flex w-full flex-col items-center justify-start gap-[50px] bg-bgGrey ">
      <PageHeader />
      <TeamSection />
      <StoriesSection />
    </div>
  );
};

export default DashBoard;
