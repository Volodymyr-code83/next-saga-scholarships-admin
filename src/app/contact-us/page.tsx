"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ContactUpEditModal from "@/components/contactUs/ContactUpEditModal";
// import { useRouter } from "next/navigation";

import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
import { setCookie, parseCookies } from "nookies"; 
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
// const analytics = getAnalytics(app);

interface PageDataType {
  imageUrl: string;
  text: string;
}

interface NotificationProps {
  message: string;
  progress: number;
  success: boolean;
}

const Page = () => {
  // const router = useRouter();
  // const token = localStorage.getItem("token");
  const cookies = parseCookies(); // Read cookies using nookies
  const token = cookies.token;

  // if (!token) {
  //   router.push("/signin");
  //   return null;
  // }

  const [pageData, setPageData] = useState<PageDataType>({
    imageUrl: "",
    text: "",
  });
  const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Saving data...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const pageDataRef = ref(db, `adminData/${userUid}/contact_us`);
        onValue(
          pageDataRef,
          (snapshot) => {
            try {
              const data = snapshot.val();
              if (data) {
                setPageData(data);
              } else {
                console.error("Data is not in the expected format");
              }
            } catch (error) {
              console.error("Error parsing data: ", error);
            }
          },
          (error) => {
            console.error("Error retrieving data from Firebase: ", error);
          }
        );
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
    setIsOpenedEditModal(false);
  };

  const handleSubmit = (image: string) => {
    setPageData({
      ...pageData,
      imageUrl: image,
    });
    setIsOpenedEditModal(false);
  };

  const handleSave = () => {
    const user = auth.currentUser;
    if (user) {
      setIsSaving(true);
      setProgress(0);
      setMessage("Saving data...");
      setSuccess(false);

      const userUid = user.uid;
      const userRef = ref(db, `adminData/${userUid}/contact_us`);
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
  };

  const handleEditImage = () => {
    setIsOpenedEditModal(true);
  };

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
    <>
      <div className="flex w-full items-start justify-center p-10">
        <div className="flex h-auto w-full max-w-[1085px] flex-col items-center justify-center  gap-11">
          <div className="flex max-h-[904px] min-h-[904px] w-full max-w-[1085px] items-center justify-center overflow-hidden rounded-[20px] bg-white">
            {pageData?.imageUrl && (
              <Image
                src={pageData?.imageUrl}
                width={1085}
                height={904}
                alt="User"
                className="mx-h-[904px] h-full  min-h-[904px] w-full max-w-[1085px] rounded-[20px] bg-cover bg-center"
              />
            )}
          </div>
          <div className="flex w-full items-center justify-end gap-5">
            <button
              className=" rounded bg-blue px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
              type="button"
              onClick={() => handleEditImage()}
            >
              Edit
            </button>
            <button
              className=" rounded bg-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
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
        {isOpenedEditModal && (
          <ContactUpEditModal
            isOpen={isOpenedEditModal}
            onClose={handleClose}
            imageUrl={pageData?.imageUrl}
            onSubmit={handleSubmit}
          />
        )}
      </div>
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
    </>
  );
};

export default Page;
