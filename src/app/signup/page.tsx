"use client";

import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressSteps";
import { setCookie, parseCookies } from "nookies";
import Link from "next/link";
import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
// import jwt from 'jsonwebtoken';
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
// import { setCookie } from "nookies";
// const dotenv = require("dotenv");

const headings = [
  {
    heading: "Your details",
    details: "Name and email",
  },
  {
    heading: "Choose a password",
    details: "Choose a secure password",
  },
  {
    heading: "Become an admin",
    details: "Start management",
  },
  {
    heading: "Control student’s forms",
    details: "Easy access",
  },
];

const isFirebaseError = (error: any): error is { code: string; message: string } => {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
};

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [currentActiveStep, setCurrentActiveStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangeValue = (value: string, type: string) => {
    setFormData({
      ...formData,
      [type]: value,
    });
    // Clear error message on typing
    setErrors({
      ...errors,
      [type]: "",
    });
  };

  const validateInputs = () => {
    const newErrors: any = {};
    // Validation logic
    if (currentActiveStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      // Set errors
      setErrors(newErrors);
    }
    if (currentActiveStep === 2) {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      // Set errors
      setErrors(newErrors);
    }

    // Check if there are any errors
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = validateInputs();
    if (isValid) {
      setCurrentActiveStep(currentActiveStep + 1);
      // createUserWithEmailAndPassword(auth, formData.email, formData.password)
      //   .then((userCredential) => {
      //     const user = userCredential.user;
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.error(errorCode, errorMessage);
      //   })
    }
  };

  

  const handleSignUp = async () => {
    const isValid = validateInputs();
    if (isValid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        console.log("token_______", token);
        setCookie(null, "token", token, { path: '/' });
        router.push('/');
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("ERROR SIGNING UP:", errorCode, errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          alert("The email address is already in use. Please try signing in instead.");
        } else {
          // Handle other errors
        }
      }
    }
  };
  
  // const token = localStorage.getItem("token");
  // if(token) router.push('/');
  // else
  const cookies = parseCookies(); // Read cookies using nookies
  const token = cookies.token;
  useEffect(() => {
    if (!token) {
        // router.push("/signin"); // Redirect to the sign-in page using Next.js's router
        window.location.href = "/signin";
      }
  }, [token]);
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F2F4F7] p-[40px]  pb-[100px] pt-[200px]">
      <div className=" flex w-full flex-col items-center justify-start gap-[100px]">
        {currentActiveStep === 1 && (
          <div className="mx-auto flex w-full flex-col items-center justify-start gap-[54px]">
            <h5 className="text-center text-[36px] font-semibold text-[#4F4F4F]">
              Welcome, create your Saga Admin account
            </h5>
            <div className="mx-auto flex min-h-[382px] w-full max-w-[512px] items-start  justify-center bg-white py-[72px] ">
              <div className="flex w-full max-w-[248px] flex-col items-center justify-start gap-[14px]">
                <p className="text=[#667085] text-center text-[16px] font-medium leading-[25px]">
                  It is our great pleasure to have you on board!
                </p>
                <div className="flex w-full flex-col items-start justify-start gap-4">
                  <input
                    className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter the name of player"
                    value={formData?.name}
                    onChange={(event) =>
                      handleChangeValue(event.target.value, "name")
                    }
                  />
                  {errors.name && (
                    <p className=" text-[14px] text-red ">{errors?.name}</p>
                  )}
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-4">
                  <input
                    className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email"
                    value={formData?.email}
                    onChange={(event) =>
                      handleChangeValue(event.target.value, "email")
                    }
                  />
                  {errors.email && (
                    <p className=" text-[14px] text-red ">{errors?.email}</p>
                  )}
                </div>
                <button
                  className="w-full rounded bg-blue px-4 py-3 text-[14px] font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
                  type="button"
                  onClick={handleNext}
                >
                  next
                </button>
                <div className="flex w-full items-center justify-center gap-1">
                  <p className="text-[12px] font-bold leading-[24px] text-[#667085] ">
                    Already have an account?
                  </p>
                  <Link
                    href="/signin"
                    className="text-[12px] font-bold leading-[24px] text-blue "
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentActiveStep === 2 && (
          <div className="mx-auto flex w-full max-w-[741px] flex-col items-center justify-start gap-[54px]">
            <h5 className="text-center text-[36px] font-semibold text-[#4F4F4F]">
              Saga Scholarships, Choose your password
            </h5>
            <div className="mx-auto flex min-h-[382px] w-full max-w-[512px] items-start  justify-center bg-white py-[50px] ">
              <div className="flex w-full max-w-[248px] flex-col items-center justify-start gap-[14px]">
                <div className="flex w-full flex-col items-start justify-start gap-1">
                  <label className="text-[14px] font-medium text-[#8A8A8A]">
                    Password
                  </label>
                  <div className=" flex w-full flex-col items-start justify-start gap-4">
                    <div className="relative  w-full ">
                      <input
                        className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={formData?.password}
                        onChange={(event) =>
                          handleChangeValue(event.target.value, "password")
                        }
                      />

                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_0_2252)">
                              <path
                                d="M12.5948 10.2003C12.7384 9.81659 12.8113 9.41002 12.8098 9.00031C12.8098 8.09062 12.4485 7.21819 11.8052 6.57494C11.162 5.93169 10.2895 5.57031 9.37982 5.57031C8.97517 5.57079 8.57385 5.6436 8.19482 5.78531L8.99982 6.61531C9.12219 6.59573 9.2459 6.5857 9.36982 6.58531C10.013 6.58397 10.6307 6.83718 11.0878 7.28966C11.545 7.74214 11.8045 8.35712 11.8098 9.00031C11.8094 9.12424 11.7994 9.24794 11.7798 9.37031L12.5948 10.2003Z"
                                fill="#4F4F4F"
                              />
                              <path
                                d="M17.1452 8.76465C15.4602 5.64965 12.5052 3.76465 9.23523 3.76465C8.34491 3.76674 7.46057 3.91019 6.61523 4.18965L7.42023 4.99965C8.01316 4.84641 8.62283 4.76747 9.23523 4.76465C12.0502 4.76465 14.6102 6.33465 16.1352 8.97965C15.5758 9.96095 14.8342 10.8264 13.9502 11.5296L14.6602 12.2396C15.6833 11.4143 16.5329 10.3947 17.1602 9.23965L17.2902 8.99965L17.1452 8.76465Z"
                                fill="#4F4F4F"
                              />
                              <path
                                d="M2.43494 2.88953L4.66494 5.11953C3.2554 6.02709 2.10339 7.28242 1.31994 8.76453L1.18994 8.99953L1.31994 9.23953C3.00494 12.3545 5.95994 14.2395 9.22994 14.2395C10.5063 14.2393 11.766 13.9504 12.9149 13.3945L15.4149 15.8945L16.2899 15.1445L3.28994 2.14453L2.43494 2.88953ZM7.30994 7.76453L10.6349 11.0895C10.2593 11.3221 9.82677 11.4466 9.38494 11.4495C9.06391 11.4495 8.74604 11.3861 8.44963 11.2628C8.15322 11.1394 7.88412 10.9587 7.65781 10.731C7.4315 10.5033 7.25246 10.2331 7.13097 9.93597C7.00949 9.63881 6.94796 9.32056 6.94994 8.99953C6.95557 8.56281 7.08003 8.13587 7.30994 7.76453ZM6.58494 7.03953C6.11716 7.69923 5.8979 8.50318 5.966 9.30903C6.03409 10.1149 6.38514 10.8706 6.95699 11.4425C7.52884 12.0143 8.2846 12.3654 9.09045 12.4335C9.89629 12.5016 10.7002 12.2823 11.3599 11.8145L12.1599 12.6145C11.2338 13.0104 10.2371 13.2145 9.22994 13.2145C6.41494 13.2145 3.85494 11.6445 2.32994 8.99953C3.06179 7.70364 4.1158 6.61863 5.38994 5.84953L6.58494 7.03953Z"
                                fill="#4F4F4F"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_0_2252">
                                <rect width="18" height="18" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : (
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                stroke="#4F4F4F"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                stroke="#4F4F4F"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>
                        )}
                      </span>
                    </div>
                    {errors.password && (
                      <p className=" text-[14px] text-red ">
                        {errors?.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-start gap-1">
                  <label className="text-[14px] font-medium text-[#8A8A8A]">
                    Confirm password
                  </label>
                  <div className="relative flex w-full flex-col items-start justify-start gap-4">
                    <div className="relative  w-full ">
                      <input
                        className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Enter your password"
                        value={formData?.confirmPassword}
                        onChange={(event) =>
                          handleChangeValue(
                            event.target.value,
                            "confirmPassword",
                          )
                        }
                      />

                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {!showConfirmPassword ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_0_2252)">
                              <path
                                d="M12.5948 10.2003C12.7384 9.81659 12.8113 9.41002 12.8098 9.00031C12.8098 8.09062 12.4485 7.21819 11.8052 6.57494C11.162 5.93169 10.2895 5.57031 9.37982 5.57031C8.97517 5.57079 8.57385 5.6436 8.19482 5.78531L8.99982 6.61531C9.12219 6.59573 9.2459 6.5857 9.36982 6.58531C10.013 6.58397 10.6307 6.83718 11.0878 7.28966C11.545 7.74214 11.8045 8.35712 11.8098 9.00031C11.8094 9.12424 11.7994 9.24794 11.7798 9.37031L12.5948 10.2003Z"
                                fill="#4F4F4F"
                              />
                              <path
                                d="M17.1452 8.76465C15.4602 5.64965 12.5052 3.76465 9.23523 3.76465C8.34491 3.76674 7.46057 3.91019 6.61523 4.18965L7.42023 4.99965C8.01316 4.84641 8.62283 4.76747 9.23523 4.76465C12.0502 4.76465 14.6102 6.33465 16.1352 8.97965C15.5758 9.96095 14.8342 10.8264 13.9502 11.5296L14.6602 12.2396C15.6833 11.4143 16.5329 10.3947 17.1602 9.23965L17.2902 8.99965L17.1452 8.76465Z"
                                fill="#4F4F4F"
                              />
                              <path
                                d="M2.43494 2.88953L4.66494 5.11953C3.2554 6.02709 2.10339 7.28242 1.31994 8.76453L1.18994 8.99953L1.31994 9.23953C3.00494 12.3545 5.95994 14.2395 9.22994 14.2395C10.5063 14.2393 11.766 13.9504 12.9149 13.3945L15.4149 15.8945L16.2899 15.1445L3.28994 2.14453L2.43494 2.88953ZM7.30994 7.76453L10.6349 11.0895C10.2593 11.3221 9.82677 11.4466 9.38494 11.4495C9.06391 11.4495 8.74604 11.3861 8.44963 11.2628C8.15322 11.1394 7.88412 10.9587 7.65781 10.731C7.4315 10.5033 7.25246 10.2331 7.13097 9.93597C7.00949 9.63881 6.94796 9.32056 6.94994 8.99953C6.95557 8.56281 7.08003 8.13587 7.30994 7.76453ZM6.58494 7.03953C6.11716 7.69923 5.8979 8.50318 5.966 9.30903C6.03409 10.1149 6.38514 10.8706 6.95699 11.4425C7.52884 12.0143 8.2846 12.3654 9.09045 12.4335C9.89629 12.5016 10.7002 12.2823 11.3599 11.8145L12.1599 12.6145C11.2338 13.0104 10.2371 13.2145 9.22994 13.2145C6.41494 13.2145 3.85494 11.6445 2.32994 8.99953C3.06179 7.70364 4.1158 6.61863 5.38994 5.84953L6.58494 7.03953Z"
                                fill="#4F4F4F"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_0_2252">
                                <rect width="18" height="18" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : (
                          <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                stroke="#4F4F4F"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <path
                                d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                stroke="#4F4F4F"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>
                        )}
                      </span>
                    </div>
                    {errors.confirmPassword && (
                      <p className=" text-[14px] text-red ">
                        {errors?.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
                <p className="mx-auto text-[#667085] ">
                  Must be at least 8 characters.
                </p>
                <button
                  className="w-full rounded bg-blue px-4 py-3 text-[14px] font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
                  type="button"
                  onClick={handleSignUp}
                >
                <Link
                    href="/"
                  >
                    Continue to dashboard
                </Link>
                </button>
                <div className="flex w-full items-center justify-center gap-1">
                  <p className="text-[12px] font-bold leading-[24px] text-[#667085] ">
                    Already have an account?
                  </p>
                  <Link
                    href="/signin"
                    className="text-[12px] font-bold leading-[24px] text-blue "
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <ProgressBar
          currentActiveStep={currentActiveStep}
          totalSteps={4}
          stepHeadings={headings}
        />
      </div>
    </div>
  );
};

export default Page;
