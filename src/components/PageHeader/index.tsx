"use client";
import { PageHeaderDataType } from "@/types";
import { useState, useEffect } from "react";
import PageHeaderModal from "./PageHeaderModal";

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


const PageHeader = () => {
  const [pageHeaderData, setPageHeaderData] = useState<PageHeaderDataType>({
    heading: "",
    subHeading: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Saving data...");
  const [success, setSuccess] = useState(false);

  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const pageDataRef = ref(db, `adminData/${userUid}/homepage_title`);
        onValue(pageDataRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setPageHeaderData(data);
          }
        });
      } else {
        setPageHeaderData({
          heading: "",
          subHeading: "",
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = (data: PageHeaderDataType) => {
    setPageHeaderData(data);
    setIsModalOpened(false);
  };

  const handleSave = () => {
    const user = auth.currentUser;
    if (user) {
      setIsSaving(true);
      setProgress(0);
      setMessage("Saving data...");
      setSuccess(false);
      const userUid = user.uid;
      const userRef = ref(db, `adminData/${userUid}/homepage_title`);
      set(userRef, {
        heading: pageHeaderData.heading,
        subHeading: pageHeaderData.subHeading,
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

  // const handleDeleteBtn = () => {
  //   setPageHeaderData({...pageHeaderData, heading: ""});
  //   setPageHeaderData({...pageHeaderData, subHeading: ""});
  // }

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageHeaderData({...pageHeaderData, heading: e.target.value});
  }

  const handleSubHeadingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPageHeaderData({...pageHeaderData, subHeading: e.target.value})
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

  return (
    <>
      <div className="flex w-full max-w-[1082px] flex-col items-start justify-start gap-5 rounded-[10px] bg-white px-9 pb-9 pt-5">
        <div className=" flex w-full items-center justify-start gap-3">
          <label
            className="block w-[150px] text-right text-[22px] font-medium text-textBlack dark:text-white"
            htmlFor="header"
          >
            Header
          </label>

          <input
            className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-6 py-4 text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name="header"
            id="header"
            defaultValue={pageHeaderData?.heading}
            onChange={handleHeadingChange}
            disabled={true}
          />
        </div>

        <div className=" flex w-full items-center justify-start gap-3">
          <label
            className="block w-[129px] text-nowrap text-[22px] font-medium text-textBlack dark:text-white"
            htmlFor="sub-header"
            
          >
            Sub-Header
          </label>

          <textarea
            className="w-full resize-none rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-6 py-4 text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            rows={4}
            name="sub-header"
            id="sub-header"
            defaultValue={pageHeaderData?.subHeading}
            onChange={handleSubHeadingChange}
            disabled={true}
          />
        </div>

        <div className="mt-7 flex w-full items-center justify-end gap-5">
          <button
            className=" rounded bg-blue px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => setIsModalOpened(true)}
          >
            Edit
          </button>
          <button
            className=" rounded bg-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      {isModalOpened && (
        <PageHeaderModal
          isOpen={isModalOpened}
          data={pageHeaderData}
          onClose={() => setIsModalOpened(false)}
          onSubmit={handleSubmit}
        />
      )}
      {isSaving && (
        <Notification message={message} progress={progress} success={success} />
      )}
    </>
  );
};

export default PageHeader;
