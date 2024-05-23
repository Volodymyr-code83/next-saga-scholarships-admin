"use client";
import { useState, useEffect } from "react";
import { TeamMemberDataType } from "@/types";
import MemberCard from "./MemberCard";
import MemberEditModal from "./MemberEditModal";

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

const dummyTeamData = [
  {
    id: "0",
    imageUrl: "",
  },
  {
    id: "1",
    imageUrl: "",
  },
  {
    id: "2",
    imageUrl: "",
  },
];

const TeamSection = () => {
  const [teamData, setTeamData] = useState<TeamMemberDataType[]>(dummyTeamData);
  const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
  const [editMember, setEditMember] = useState<{
    imageUrl: string;
    index: number;
  } | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Saving data...");
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        const pageDataRef = ref(db, `adminData/${userUid}/homepage_teamData`);
        onValue(pageDataRef, (snapshot) => {
          const data = snapshot.val();
          console.log("_____data_____", data);
          if (data) {
            setTeamData(data);
          }
        });
      } else {
        setTeamData([
          {
            id: "0",
            imageUrl: "",
          },
          {
            id: "1",
            imageUrl: "",
          },
          {
            id: "2",
            imageUrl: "",
          },
        ]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEdit = (imageUrl: string, index: number) => {
    setEditMember({
      imageUrl,
      index,
    });
    setIsOpenedEditModal(true);
  };

  const handleClose = () => {
    setEditMember(null);
    setIsOpenedEditModal(false);
  };

  const handleSubmit = (image: string) => {
    const prevTeamData = structuredClone(teamData);
    const memberIndex = prevTeamData?.findIndex(
      (_, i) => i === editMember?.index,
    );

    if (memberIndex !== -1) {
      prevTeamData[memberIndex] = {
        ...prevTeamData[memberIndex],
        imageUrl: image,
      };
    }
    setTeamData(prevTeamData);
    setEditMember(null);
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
      const userRef = ref(db, `adminData/${userUid}/homepage_teamData`);
      set(userRef, 
          [
            {
              id: teamData[0].id,
              imageUrl: teamData[0].imageUrl,
            },
            {
              id: teamData[1].id,
              imageUrl: teamData[1].imageUrl,
            },
            {
              id: teamData[2].id,
              imageUrl: teamData[2].imageUrl,
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
    <div className="m-w-[1412px] flex w-full flex-wrap items-start justify-between gap-10 rounded-[10px] bg-white px-[138px] py-[50px] ">
      {teamData?.map((member, index) => (
        <MemberCard
          key={index}
          index={index}
          member={member}
          onEdit={handleEdit}
        />
      ))}

      {isOpenedEditModal && (
        <MemberEditModal
          isOpen={isOpenedEditModal}
          imageUrl={editMember?.imageUrl || ""}
          onClose={handleClose}
          onSubmit={handleSubmit}
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
      {isSaving && (
        <Notification message={message} progress={progress} success={success} />
    )}
      </div>
      
    </div>
    
    
    </>
  );
};

export default TeamSection;
