"use client";
import { useState, useEffect } from "react";
import { StoryDataType } from "@/types";
import StoryCard from "./StoryCard";
import StoryEditModal from "./StoryEditModal";

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

const storiesDummyData = [
  {
    id: "0",
    imageUrl: "",
    heading: "34K+",
    subHeading: "Success Stories",
    detailsLink: "",
  },
  {
    id: "1",
    imageUrl: "",
    heading: "34K+",
    subHeading: "Success Stories",
    detailsLink: "",
  },
  {
    id: "2",
    imageUrl: "",
    heading: "34K+",
    subHeading: "Success Stories",
    detailsLink: "",
  },
];

const StoriesSection = () => {
  const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
  const [stories, setStories] = useState<StoryDataType[]>(storiesDummyData);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Saving data...");
  const [success, setSuccess] = useState(false);

  const [editStory, setEditStory] = useState<{
    imageUrl: string;
    index: number;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const pageDataRef = ref(db, `adminData/${userUid}/homepage_storyData`);
        onValue(pageDataRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setStories(data);
          }
        });
      } else {
        setStories([
          {
            id: "0",
            imageUrl: "",
            heading: "34K+",
            subHeading: "Success Stories",
            detailsLink: "",
          },
          {
            id: "1",
            imageUrl: "",
            heading: "34K+",
            subHeading: "Success Stories",
            detailsLink: "",
          },
          {
            id: "2",
            imageUrl: "",
            heading: "34K+",
            subHeading: "Success Stories",
            detailsLink: "",
          },
        ]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEdit = (imageUrl: string, index: number) => {
    setEditStory({
      imageUrl,
      index,
    });
    setIsOpenedEditModal(true);
  };

  const handleClose = () => {
    setEditStory(null);
    setIsOpenedEditModal(false);
  };

  const handleSubmit = (image: string) => {
    const prevStoriesData = structuredClone(stories);
    const memberIndex = prevStoriesData?.findIndex(
      (_, i) => i === editStory?.index,
    );

    if (memberIndex !== -1) {
      prevStoriesData[memberIndex] = {
        ...prevStoriesData[memberIndex],
        imageUrl: image,
      };
    }
    setStories(prevStoriesData);
    setEditStory(null);
    setIsOpenedEditModal(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    setProgress(0);
    setMessage("Saving data...");
    setSuccess(false);
    const user = auth.currentUser;
    if (user) {
      const userUid = user.uid;
      const userRef = ref(db, `adminData/${userUid}/homepage_storyData`);
      set(userRef, 
          [
            {
              id: stories[0].id,
              imageUrl: stories[0].imageUrl,
              heading: stories[0].heading,
              subHeading: stories[0].subHeading,
              detailsLink: stories[0].detailsLink,
            },
            {
              id: stories[1].id,
              imageUrl: stories[1].imageUrl,
              heading: stories[1].heading,
              subHeading: stories[1].subHeading,
              detailsLink: stories[1].detailsLink,
            },
            {
              id: stories[2].id,
              imageUrl: stories[2].imageUrl,
              heading: stories[2].heading,
              subHeading: stories[2].subHeading,
              detailsLink: stories[2].detailsLink,
            },
          ]
        )
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

  return (
    <>
    <div className="flex w-full flex-nowrap items-center justify-start gap-5">
      {stories?.map((story, index) => (
        <StoryCard
          key={index}
          index={index}
          story={story}
          onEdit={handleEdit}
        />
      ))}
      {isOpenedEditModal && (
        <StoryEditModal
          isOpen={isOpenedEditModal}
          imageUrl={editStory?.imageUrl || ""}
          onClose={handleClose}
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

export default StoriesSection;
