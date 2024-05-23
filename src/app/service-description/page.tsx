"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ServiceDescImageModal from "@/components/services/ServiceDescImageModal";
import ServiceDescTextEditModal from "@/components/services/ServiceDescTextEditModal";

import { setCookie, parseCookies } from "nookies"; 
import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
// const analytics = getAnalytics(app);

interface NotificationProps {
  message: string;
  progress: number;
  success: boolean;
}

interface PageDataType {
  imageUrl: string;
  text: string;
}

const Page = () => {
  const cookies = parseCookies(); // Read cookies using nookies
  const token = cookies.token;
  const [pageData, setPageData] = useState<PageDataType>({
    imageUrl: "",
    text: "",
  });
  const [isOpenedEditImageModal, setIsOpenedEditImageModal] = useState(false);
  const [isOpenedEditTextModal, setIsOpenedEditTextModal] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Saving data...");
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const pageDataRef = ref(db, `adminData/${userUid}/services/service_description`);
        onValue(pageDataRef, (snapshot) => {
          try {
            const data = snapshot.val();
            if (data) {
              if (data) {
                setPageData(data);
              } else {
                console.error("Data is not in the expected format");
              }
            } else {
              console.error("No data found in the database");
            }
          } catch (error) {
            console.error("Error parsing data: ", error);
          }
        }, (error) => {
          console.error("Error retrieving data from Firebase: ", error);
        });
      } else {
        setPageData({
          imageUrl: "",
          text: "",
        });
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  const handleClose = () => {
    setIsOpenedEditImageModal(false);
    setIsOpenedEditTextModal(false);
  };

  const handleEditImage = () => {
    setIsOpenedEditImageModal(true);
  };

  const handleEditText = () => {
    setIsOpenedEditTextModal(true);
  };

  const handleSubmitImage = (image: string) => {
    setPageData({
      ...pageData,
      imageUrl: image,
    });
    setIsOpenedEditImageModal(false);
  };

  const handleSubmitText = (text: string) => {
    setPageData({
      ...pageData,
      text,
    });
    setIsOpenedEditTextModal(false);
  };

  const handleSave = () => {
    const user = auth.currentUser;
    if (user) {
      setIsSaving(true);
      setProgress(0);
      setMessage("Saving data...");
      setSuccess(false);
      const userUid = user.uid;
      const userRef = ref(db, `adminData/${userUid}/services/service_description`);
      set(userRef, pageData)
      .then(() => {
        console.log("Page data saved successfully!");
        setProgress(100);
        setMessage("Data saved successfully! ✔️");
        setTimeout(() => {
          setSuccess(true);
          setTimeout(() => {
            setIsSaving(false);
          }, 3000); // Keep success message displayed for 3 seconds
        }, 1000); // Allow time for the progress bar to fill before hiding
      })
      .catch((error) => {
        console.error("Error saving page data: ", error);
        setIsSaving(false);
      });

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 90) {
          return prevProgress + 10;
        } else {
          clearInterval(interval);
          return prevProgress;
        }
      });
    }, 300);
  } else {
    console.error("No user is currently signed in.");
  }
  }

  const Notification = ({ message, progress, success }: NotificationProps) => {
    return (
      <div
        className={`fixed right-5 bottom-5 w-80 p-4 bg-green-600 text-white rounded shadow-lg transition-transform duration-700 ${
          success && "transform translate-x-full"
        }`}
      >
        <div>{message}</div>
        {!success && (
          <div className="w-full bg-green-200 h-2 rounded mt-2">
            <div
              className="bg-green-500 h-full rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (!token) {
        // router.push("/signin"); // Redirect to the sign-in page using Next.js's router
        window.location.href = "/signin";
      }
  }, [token]);


  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start justify-start gap-[30px]">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start justify-center gap-[30px]">
        <div className="relative mx-auto flex h-full max-h-[588px] min-h-[588px] w-full max-w-[892px] items-center justify-center  rounded-[20px] bg-grey">
          {pageData?.imageUrl && (
            <Image
              src={pageData?.imageUrl}
              width={892}
              height={588}
              alt=""
              className="h-full max-h-[588px] w-auto rounded-[20px] bg-cover bg-center"
            />
          )}
        </div>
        <div className="flex w-full items-center justify-center gap-5">
          <button
            className="rounded bg-blue px-4 py-2 text-[13px] uppercase leading-[13px] text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => handleEditImage()}
          >
            Edit
          </button>
          <button
            className=" rounded bg-red px-4 py-2 text-[13px] uppercase leading-[13px] text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={() =>
              setPageData({
                ...pageData,
                imageUrl: "",
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start justify-center gap-[30px]">
        <div className="mx-auto flex min-h-[215px] w-full max-w-[892px] flex-col items-start justify-start rounded-[10px] bg-white px-5 py-[30px] text-[24px] text-textBlack">
          {pageData?.text}
        </div>

        <div className="flex w-full items-center justify-center gap-5">
          <button
            className="rounded bg-blue px-4 py-2 text-[13px] uppercase leading-[13px] text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => handleEditText()}
          >
            Edit
          </button>
          <button
            className=" rounded bg-red px-4 py-2 text-[13px] uppercase leading-[13px] text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={() =>
              setPageData({
                ...pageData,
                text: "",
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
      {isOpenedEditImageModal && (
        <ServiceDescImageModal
          isOpen={isOpenedEditImageModal}
          onClose={handleClose}
          imageUrl={pageData?.imageUrl}
          onSubmit={handleSubmitImage}
        />
      )}
      {isOpenedEditTextModal && (
        <ServiceDescTextEditModal
          isOpen={isOpenedEditTextModal}
          onClose={handleClose}
          text={pageData?.text}
          onSubmit={handleSubmitText}
        />
      )}
      <div className="mt-7 flex w-full items-center justify-end gap-5">
        <button
          className=" rounded bg-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
          type="button"
          onClick={handleSave}
          >
          Save
        </button>
      </div>
      {isSaving && (
        <Notification message={message} progress={progress} success={success} />
      )}

    </div>
  );
};

export default Page;
