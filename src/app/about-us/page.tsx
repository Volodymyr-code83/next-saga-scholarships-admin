"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AboutPageDataType } from "@/types";
import ImageEditModal from "../../components/about/ImageEditModal";
import TextEditModal from "../../components/about/TextEditModal";
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

const dummyData = {
  imageUrl:"",
  text: "",
  d_title: "",
  d_imageUrl: "",
  d_text: "",
};

interface NotificationProps {
  message: string;
  progress: number;
  success: boolean;
}

const AboutUs = () => {
  const cookies = parseCookies(); // Read cookies using nookies
  const token = cookies.token;
  // const router = useRouter(); 
  
 
  // if (!token) {
  //   router.push("/signin"); 
  //   return null; 
  // }
  const [pageData, setPageData] = useState<AboutPageDataType>(dummyData);
  const [isOpenedEditImageModal1, setIsOpenedEditImageModal1] = useState(false);
  const [isOpenedEditTextModal1, setIsOpenedEditTextModal1] = useState(false);

  const [isOpenedEditTextModal2, setIsOpenedEditTextModal2] = useState(false);
  const [isOpenedEditImageModal2, setIsOpenedEditImageModal2] = useState(false);
  const [isOpenedEditTextModal3, setIsOpenedEditTextModal3] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Saving data...");
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const pageDataRef = ref(db, `adminData/${userUid}/aboutus`);
        onValue(pageDataRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setPageData(data);
          }
        });
      } else {
        setPageData({
          imageUrl: "",
          text: "",
          d_title: "",
          d_imageUrl: "",
          d_text: "",
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEditImage1 = () => {
    setIsOpenedEditImageModal1(true);
  };

  const handleEditText1 = () => {
    setIsOpenedEditTextModal1(true);
  };

  const handleClose1 = () => {
    setIsOpenedEditImageModal1(false);
    setIsOpenedEditTextModal1(false);
  };

  const handleSubmitImage1 = (image: string) => {
    setPageData({
      ...pageData,
      imageUrl: image,
    });
    setIsOpenedEditImageModal1(false);
  };

  const handleSubmitText1 = (text: string) => {
    setPageData({
      ...pageData,
      text,
    });
    setIsOpenedEditTextModal1(false);
  };

//------------------2-------------------------

  const handleEditText2 = () => {
    setIsOpenedEditTextModal2(true);
  };

  const handleSubmitText2 = (text: string) => {
    setPageData({
      ...pageData,
      d_title: text,
    });
    setIsOpenedEditTextModal2(false);
  };



  const handleEditImage2 = () => {
    setIsOpenedEditImageModal2(true);
  };
  
  const handleSubmitImage2 = (image: string) => {
    setPageData({
      ...pageData,
      d_imageUrl: image,
    });
    setIsOpenedEditImageModal2(false);
  };


  const handleEditText3 = () => {
    setIsOpenedEditTextModal3(true);
  };

  const handleSubmitText3 = (text: string) => {
    setPageData({
      ...pageData,
      d_text: text,
    });
    setIsOpenedEditTextModal3(false);
  };

  const handleClose2 = () => {
    setIsOpenedEditImageModal2(false);
    setIsOpenedEditTextModal2(false);
    setIsOpenedEditTextModal3(false);
  };

  const handleSave = () => {
    const user = auth.currentUser;
    if (user) {
      setIsSaving(true);
      setProgress(0);
      setMessage("Saving data...");
      setSuccess(false);

      const userUid = user.uid;
      const userRef = ref(db, `adminData/${userUid}/aboutus`);
      set(userRef, {
        imageUrl: pageData.imageUrl,
        text: pageData.text,
        d_title: pageData.d_title,
        d_imageUrl: pageData.d_imageUrl,
        d_text: pageData.d_text,
      })
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
    <>
    <div className="flex w-full flex-col items-start justify-start gap-15">
      <div className="relative flex w-full flex-col items-start justify-start gap-[30px]">
        <div className="relative flex  h-full max-h-[516px] min-h-[516px] w-full max-w-[1510px] items-center justify-center rounded-[10px] bg-white">
          {pageData?.imageUrl && (
            <Image
              src={pageData?.imageUrl}
              width={1510}
              height={516}
              alt=""
              className="h-auto max-h-[516px]  w-full max-w-[1510px] rounded-[10px] bg-cover bg-center "
            />
          )}
        </div>
        <div className="relative flex w-full items-center justify-start gap-5">
          <button
            className=" rounded bg-blue px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => handleEditImage1()}
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
      <div className="flex w-full flex-col items-start justify-start gap-[30px]">
        <div className="ju  flex w-full items-start rounded-[10px] bg-white p-10 text-2xl text-textBlack">
          {pageData?.text}
        </div>
        <div className="flex w-full items-center justify-start gap-5">
          <button
            className=" rounded bg-blue px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => handleEditText1()}
          >
            Edit
          </button>
          <button
            className=" rounded bg-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
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
      <h1 className="text-4xl text-black font-bold">Detailed Information (Learn more)</h1>
      <div className="flex w-full flex-col items-start justify-start gap-[30px]">
        <div className="ju  flex w-full items-start rounded-[10px] bg-white p-10 text-2xl text-textBlack">
          {pageData?.d_title}
        </div>
        <div className="flex w-full items-center justify-start gap-5">
          <button
            className=" rounded bg-blue px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => handleEditText2()}
          >
            Edit
          </button>
          <button
            className=" rounded bg-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={() =>
              setPageData({
                ...pageData,
                d_title: "",
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-start justify-start gap-[30px]">
        <div className="relative flex  h-full max-h-[516px] min-h-[516px] w-full max-w-[1510px] items-center justify-center rounded-[10px] bg-white">
          {pageData?.d_imageUrl && (
            <Image
              src={pageData?.d_imageUrl}
              width={1510}
              height={516}
              alt=""
              className="h-auto max-h-[516px]  w-full max-w-[1510px] rounded-[10px] bg-cover bg-center "
            />
          )}
        </div>
        <div className="relative flex w-full items-center justify-start gap-5">
          <button
            className=" rounded bg-blue px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => handleEditImage2()}
          >
            Edit
          </button>
          <button
            className=" rounded bg-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={() =>
              setPageData({
                ...pageData,
                d_imageUrl: "",
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-[30px]">
        <div className="ju  flex w-full items-start rounded-[10px] bg-white p-10 text-2xl text-textBlack">
          {pageData?.d_text}
        </div>
        <div className="flex w-full items-center justify-start gap-5">
          <button
            className=" rounded bg-blue px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => handleEditText3()}
          >
            Edit
          </button>
          <button
            className=" rounded bg-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={() =>
              setPageData({
                ...pageData,
                d_text: "",
              })
            }
          >
            Delete
          </button>
        </div>
      </div>



      {isOpenedEditImageModal1 && (
        <ImageEditModal
          isOpen={isOpenedEditImageModal1}
          onClose={handleClose1}
          imageUrl={pageData?.imageUrl}
          onSubmit={handleSubmitImage1}
        />
      )}
      {isOpenedEditTextModal1 && (
        <TextEditModal
          isOpen={isOpenedEditTextModal1}
          onClose={handleClose1}
          text={pageData?.text}
          onSubmit={handleSubmitText1}
        />
      )}

      {isOpenedEditTextModal2 && (
        <TextEditModal
          isOpen={isOpenedEditTextModal2}
          onClose={handleClose2}
          text={pageData?.d_title}
          onSubmit={handleSubmitText2}
        />
      )}
      {isOpenedEditImageModal2 && (
        <ImageEditModal
          isOpen={isOpenedEditImageModal2}
          onClose={handleClose2}
          imageUrl={pageData?.d_imageUrl}
          onSubmit={handleSubmitImage2}
        />
      )}
      {isOpenedEditTextModal3 && (
        <TextEditModal
          isOpen={isOpenedEditTextModal3}
          onClose={handleClose2}
          text={pageData?.d_text}
          onSubmit={handleSubmitText3}
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

export default AboutUs;
